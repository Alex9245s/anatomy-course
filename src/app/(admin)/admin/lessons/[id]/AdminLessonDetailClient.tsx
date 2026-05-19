'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { LessonImage, Question } from '@/types';

interface Lesson { id: string; topic_id: string; title_he: string; title_en: string; content_he: string|null; content_en: string|null; order_index: number; topics: { id: string; title_he: string } | null; }

export default function AdminLessonDetailClient({ lesson, images: initImgs, questions: initQs }: { lesson: Lesson; images: LessonImage[]; questions: Question[] }) {
  const { lang } = useLang();
  const [images, setImages] = useState(initImgs);
  const [questions, setQuestions] = useState(initQs);
  const [uploading, setUploading] = useState(false);
  const [showQForm, setShowQForm] = useState(false);
  const [qForm, setQForm] = useState({ question_he:'', question_en:'', options_he:['','','',''], options_en:['','','',''], correct_index:0, explanation_he:'', explanation_en:'', type:'quiz' as 'quiz'|'test'|'final', order_index: initQs.length+1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `lessons/${lesson.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('anatomy-images').upload(path, file);
    if (upErr) { setMsg(upErr.message); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('anatomy-images').getPublicUrl(path);
    const { data, error } = await supabase.from('lesson_images').insert({ lesson_id: lesson.id, image_url: urlData.publicUrl, caption_he: '', caption_en: '', order_index: images.length+1 }).select().single();
    if (error) { setMsg(error.message); } else { setImages(i => [...i, data]); setMsg(tr('success', lang)); }
    setUploading(false);
  }

  async function deleteImage(id: string, url: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    const path = url.split('/anatomy-images/')[1];
    await supabase.storage.from('anatomy-images').remove([path]);
    await supabase.from('lesson_images').delete().eq('id', id);
    setImages(i => i.filter(x => x.id !== id));
  }

  async function saveQuestion(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('questions').insert({ ...qForm, lesson_id: lesson.id, topic_id: null }).select().single();
    if (error) { setMsg(error.message); } else { setQuestions(q => [...q, data]); setShowQForm(false); setMsg(tr('success', lang)); }
    setSaving(false);
  }

  async function deleteQuestion(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('questions').delete().eq('id', id);
    setQuestions(q => q.filter(x => x.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link href={`/admin/topics/${lesson.topic_id}`} className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <p className="text-xs text-gray-400">{lesson.topics?.title_he}</p>
          <h1 className="text-xl font-bold">{lesson.title_he}</h1>
          <p className="text-sm text-gray-500">{lesson.title_en}</p>
        </div>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}

      {/* Images */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">{tr('images', lang)}</h2>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
            {uploading ? tr('uploading', lang) : tr('uploadImage', lang)}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadImage} />
        </div>
        {images.length === 0 && <p className="text-gray-400 text-sm">{tr('noImages', lang)}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200">
              <div className="relative h-32 bg-gray-100">
                <Image src={img.image_url} alt="" fill className="object-cover" />
              </div>
              <div className="p-2 text-xs text-gray-500">{img.caption_he || '—'}</div>
              <button onClick={() => deleteImage(img.id, img.image_url)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">{tr('questions', lang)}</h2>
          <button onClick={() => setShowQForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ {tr('addQuestion', lang)}</button>
        </div>
        {showQForm && (
          <form onSubmit={saveQuestion} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <F label={tr('questionType', lang)} value={qForm.type} set={v => setQForm(f=>({...f,type:v as 'quiz'|'test'|'final'}))}>
                <select value={qForm.type} onChange={e => setQForm(f=>({...f,type:e.target.value as 'quiz'|'test'|'final'}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="quiz">{tr('quizType', lang)}</option>
                  <option value="test">{tr('testType', lang)}</option>
                  <option value="final">{tr('finalType', lang)}</option>
                </select>
              </F>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Tf label={tr('contentHe', lang)} value={qForm.question_he} set={v => setQForm(f=>({...f,question_he:v}))} required />
              <Tf label={tr('contentEn', lang)} value={qForm.question_en} set={v => setQForm(f=>({...f,question_en:v}))} dir="ltr" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Tf label={`${tr('optionIndex',lang)} ${i+1} (HE)`} value={qForm.options_he[i]} set={v => { const a=[...qForm.options_he]; a[i]=v; setQForm(f=>({...f,options_he:a})); }} required />
                  <Tf label={`${tr('optionIndex',lang)} ${i+1} (EN)`} value={qForm.options_en[i]} set={v => { const a=[...qForm.options_en]; a[i]=v; setQForm(f=>({...f,options_en:a})); }} dir="ltr" required />
                </div>
              ))}
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">{tr('correctAnswer', lang)} (0-3)</span>
              <input type="number" min={0} max={3} value={qForm.correct_index} onChange={e => setQForm(f=>({...f,correct_index:Number(e.target.value)}))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20" />
            </label>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
              <button type="button" onClick={() => setShowQForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg">{tr('cancel', lang)}</button>
            </div>
          </form>
        )}
        {questions.length === 0 && <p className="text-gray-400 text-sm">{tr('noQuestions', lang)}</p>}
        {questions.map(q => (
          <div key={q.id} className="flex items-start justify-between border border-gray-200 rounded-xl p-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">{q.type}</p>
              <p className="font-medium text-gray-800 text-sm">{q.question_he}</p>
              <p className="text-xs text-gray-500 mt-0.5">{q.question_en}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {q.options_he.map((opt, i) => (
                  <span key={i} className={`text-xs px-2 py-0.5 rounded-full border ${i === q.correct_index ? 'bg-green-100 border-green-300 text-green-700' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>{opt}</span>
                ))}
              </div>
            </div>
            <button onClick={() => deleteQuestion(q.id)} className="text-red-500 hover:text-red-700 text-sm shrink-0">{tr('delete', lang)}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function F({ label, value, set, children }: { label: string; value: string; set: (v:string)=>void; children?: React.ReactNode }) {
  return <label className="block"><span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>{children}</label>;
}
function Tf({ label, value, set, required, dir }: { label: string; value: string; set:(v:string)=>void; required?:boolean; dir?: string }) {
  return <label className="block"><span className="block text-sm font-medium text-gray-700 mb-1">{label}</span><input type="text" value={value} onChange={e=>set(e.target.value)} required={required} dir={dir} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></label>;
}

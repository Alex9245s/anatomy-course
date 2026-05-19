'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Topic, Lesson } from '@/types';

export default function AdminTopicDetailClient({ topic, lessons: initial }: { topic: Topic; lessons: Lesson[] }) {
  const { lang } = useLang();
  const [lessons, setLessons] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title_he: '', title_en: '', content_he: '', content_en: '', order_index: initial.length + 1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function saveLesson(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('lessons').insert({ ...form, topic_id: topic.id }).select().single();
    if (error) { setMsg(error.message); } else { setLessons(l => [...l, data]); setShowForm(false); setMsg(tr('success', lang)); }
    setSaving(false);
  }

  async function deleteLesson(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('lessons').delete().eq('id', id);
    setLessons(l => l.filter(x => x.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/topics" className="text-gray-400 hover:text-blue-600">←</Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{topic.title_he}</h1>
          <p className="text-sm text-gray-500">{topic.title_en}</p>
        </div>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700">{tr('lessons', lang)}</h2>
        <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">+ {tr('addLesson', lang)}</button>
      </div>
      {showForm && (
        <form onSubmit={saveLesson} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <F label={tr('titleHe', lang)} value={form.title_he} set={v => setForm(f=>({...f,title_he:v}))} required />
            <F label={tr('titleEn', lang)} value={form.title_en} set={v => setForm(f=>({...f,title_en:v}))} required dir="ltr" />
            <F label={tr('contentHe', lang)} value={form.content_he} set={v => setForm(f=>({...f,content_he:v}))} textarea />
            <F label={tr('contentEn', lang)} value={form.content_en} set={v => setForm(f=>({...f,content_en:v}))} textarea dir="ltr" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg">{tr('cancel', lang)}</button>
          </div>
        </form>
      )}
      {lessons.length === 0 && <p className="text-gray-400 text-sm">{tr('noLessons', lang)}</p>}
      {[...lessons].sort((a,b)=>a.order_index-b.order_index).map(l => (
        <div key={l.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">{l.title_he}</p>
            <p className="text-sm text-gray-500">{l.title_en}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/lessons/${l.id}`} className="text-sm text-blue-600 border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-50">{tr('edit', lang)}</Link>
            <button onClick={() => deleteLesson(l.id)} className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50">{tr('delete', lang)}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function F({ label, value, set, required, textarea, dir }: { label: string; value: string; set: (v:string)=>void; required?: boolean; textarea?: boolean; dir?: string }) {
  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {textarea ? <textarea value={value} onChange={e=>set(e.target.value)} className={cls} rows={4} dir={dir}/> : <input type="text" value={value} onChange={e=>set(e.target.value)} required={required} className={cls} dir={dir}/>}
    </label>
  );
}

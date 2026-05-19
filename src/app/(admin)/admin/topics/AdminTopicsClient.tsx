'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/contexts/LangContext';
import { tr } from '@/lib/i18n';
import type { Topic } from '@/types';

type TopicWithLessons = Topic & { lessons: { id: string; title_he: string; title_en: string; order_index: number }[] };

export default function AdminTopicsClient({ topics: initial }: { topics: TopicWithLessons[] }) {
  const { lang } = useLang();
  const router = useRouter();
  const [topics, setTopics] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title_he: '', title_en: '', description_he: '', description_en: '', order_index: topics.length + 1 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function saveTopic(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('topics').insert(form).select().single();
    if (error) { setMsg(error.message); } else { setTopics(t => [...t, { ...data, lessons: [] }]); setShowForm(false); setMsg(tr('success', lang)); setForm({ title_he:'', title_en:'', description_he:'', description_en:'', order_index: topics.length + 2 }); }
    setSaving(false);
  }

  async function deleteTopic(id: string) {
    if (!confirm(tr('deleteConfirm', lang))) return;
    const supabase = createClient();
    await supabase.from('topics').delete().eq('id', id);
    setTopics(t => t.filter(x => x.id !== id));
    setMsg(tr('deleteSuccess', lang));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{tr('topics', lang)}</h1>
        <button onClick={() => setShowForm(v => !v)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ {tr('addTopic', lang)}</button>
      </div>
      {msg && <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">{msg}</p>}

      {showForm && (
        <form onSubmit={saveTopic} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-gray-700">{tr('addTopic', lang)}</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={tr('titleHe', lang)} value={form.title_he} onChange={v => setForm(f => ({...f, title_he: v}))} required />
            <FormField label={tr('titleEn', lang)} value={form.title_en} onChange={v => setForm(f => ({...f, title_en: v}))} required dir="ltr" />
            <FormField label={tr('descHe', lang)} value={form.description_he} onChange={v => setForm(f => ({...f, description_he: v}))} textarea />
            <FormField label={tr('descEn', lang)} value={form.description_en} onChange={v => setForm(f => ({...f, description_en: v}))} textarea dir="ltr" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{saving ? tr('saving', lang) : tr('save', lang)}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50">{tr('cancel', lang)}</button>
          </div>
        </form>
      )}

      {topics.length === 0 && <p className="text-gray-400">{tr('noTopics', lang)}</p>}
      {topics.map(topic => (
        <div key={topic.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
            <div>
              <p className="font-bold text-gray-800">{topic.title_he}</p>
              <p className="text-sm text-gray-500">{topic.title_en}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/topics/${topic.id}`} className="text-sm text-blue-600 border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-50">{tr('edit', lang)}</Link>
              <button onClick={() => deleteTopic(topic.id)} className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50">{tr('delete', lang)}</button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {topic.lessons.length === 0 && <p className="text-sm text-gray-400">{tr('noLessons', lang)}</p>}
            {[...topic.lessons].sort((a,b) => a.order_index - b.order_index).map(l => (
              <div key={l.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-gray-700">{l.title_he}</span>
                <Link href={`/admin/lessons/${l.id}`} className="text-blue-600 hover:underline">{tr('edit', lang)}</Link>
              </div>
            ))}
            <Link href={`/admin/topics/${topic.id}`} className="block text-center text-sm text-blue-600 hover:underline pt-1">+ {tr('addLesson', lang)}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormField({ label, value, onChange, required, textarea, dir }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; textarea?: boolean; dir?: string }) {
  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} className={cls} rows={3} dir={dir} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} required={required} className={cls} dir={dir} />
      }
    </label>
  );
}

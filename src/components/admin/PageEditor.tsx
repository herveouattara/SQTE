import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { PageContent } from '../../types/cms';
import { cmsService } from '../../services/cms';
import { Save, Image, Layout, Settings } from 'lucide-react';

interface PageEditorProps {
  page?: PageContent;
  onSave: (page: PageContent) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ page, onSave }) => {
  const [content, setContent] = useState(page?.content || '');
  const [title, setTitle] = useState(page?.title || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [showSettings, setShowSettings] = useState(false);
  const [metaDescription, setMetaDescription] = useState(page?.meta_description || '');
  const [metaKeywords, setMetaKeywords] = useState(page?.meta_keywords || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
      setError('Le titre et le contenu sont requis');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const pageData = {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        status: 'published' as const
      };

      if (page?.id) {
        const updatedPage = await cmsService.updatePage(page.id, pageData);
        onSave(updatedPage);
      } else {
        const newPage = await cmsService.createPage(pageData);
        onSave(newPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full bg-gray-900 rounded-lg p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 text-white rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la page"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-blue-500 text-xl"
          />
        </div>
        <div className="flex gap-4 ml-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mb-6 bg-gray-800 p-4 rounded">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">URL de la page</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Meta Description</label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <Editor
        apiKey="votre-clé-api-tinymce"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          skin: 'oxide-dark',
          content_css: 'dark',
          images_upload_handler: async (blobInfo) => {
            try {
              const file = blobInfo.blob();
              const { url } = await cmsService.uploadMedia(file);
              return url;
            } catch (error) {
              console.error('Upload error:', error);
              throw error;
            }
          }
        }}
      />
    </div>
  );
};
import React, { useState, useCallback } from 'react';
import { Upload, Trash2, Image, FileText, Film } from 'lucide-react';
import { MediaFile } from '../../types/cms';
import { cmsService } from '../../services/cms';

interface MediaLibraryProps {
  onSelect?: (media: MediaFile) => void;
  multiple?: boolean;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelect, multiple = false }) => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const loadMedia = useCallback(async () => {
    try {
      const mediaFiles = await cmsService.getMedia();
      setMedia(mediaFiles);
    } catch (error) {
      console.error('Error loading media:', error);
    }
  }, []);

  React.useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await cmsService.uploadMedia(file);
      }
      loadMedia();
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await cmsService.deleteMedia(id);
      setMedia(media.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleSelect = (mediaFile: MediaFile) => {
    if (!onSelect) return;

    if (multiple) {
      const newSelected = new Set(selectedFiles);
      if (newSelected.has(mediaFile.id)) {
        newSelected.delete(mediaFile.id);
      } else {
        newSelected.add(mediaFile.id);
      }
      setSelectedFiles(newSelected);
      onSelect(media.filter(m => newSelected.has(m.id))[0]);
    } else {
      onSelect(mediaFile);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Film className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Bibliothèque multimédia</h2>
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
          <Upload className="w-5 h-5" />
          {uploading ? 'Envoi en cours...' : 'Ajouter des fichiers'}
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((file) => (
          <div
            key={file.id}
            className={`relative group rounded-lg overflow-hidden cursor-pointer
              ${selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleSelect(file)}
          >
            {file.type === 'image' ? (
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="w full h-32 bg-gray-800 flex items-center justify-center">
                {getFileIcon(file.type)}
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.id);
                }}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 bg-gray-800">
              <p className="text-sm text-gray-300 truncate">{file.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
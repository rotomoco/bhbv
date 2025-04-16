import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import type { Post } from '../types';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});

  useEffect(() => {
    // Check auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const fetchPost = async () => {
      try {
        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!id || !uuidRegex.test(id)) {
          throw new Error('Ungültige Beitrags-ID');
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*, user_id')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
        setEditedPost({
          title: data.title,
          content: data.content,
          image: data.image,
          created_at: format(new Date(data.created_at), "yyyy-MM-dd"),
        });
      } catch (err) {
        setError('Beitrag konnte nicht geladen werden');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title: editedPost.title,
          content: editedPost.content,
          image: editedPost.image || null,
          created_at: new Date(editedPost.created_at + 'T00:00:00.000Z').toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setPost(prev => ({
        ...prev!,
        ...editedPost,
        created_at: new Date(editedPost.created_at + 'T00:00:00.000Z').toISOString(),
      }));
      setIsEditing(false);
    } catch (err) {
      setError('Fehler beim Aktualisieren des Beitrags');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Möchten Sie diesen Beitrag wirklich löschen?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      navigate('/');
    } catch (err) {
      setError('Fehler beim Löschen des Beitrags');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600">Beitrag wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error || 'Beitrag nicht gefunden'}
          </div>
        </div>
      </div>
    );
  }

  const canEdit = user && post.user_id === user.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Zurück
        </button>

        {canEdit && (
          <div className="flex gap-4">
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit size={20} className="mr-2" />
              {isEditing ? 'Speichern' : 'Bearbeiten'}
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={20} className="mr-2" />
              Löschen
            </button>
          </div>
        )}
      </div>
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
                className="text-4xl font-bold w-full mb-4 p-2 border rounded"
              />
              <input
                type="date"
                name="created_at"
                value={editedPost.created_at}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <time className="text-gray-500">
                {format(new Date(post.created_at), 'dd. MMMM yyyy', { locale: de })}
              </time>
            </>
          )}
        </header>

        {/* Image Section */}
        <div className="mb-8">
          {isEditing && (
            <input
              type="url"
              name="image"
              value={editedPost.image}
              onChange={handleChange}
              placeholder="Bild-URL"
              className="w-full mb-4 p-2 border rounded"
            />
          )}
          {post.image ? (
            <img
              src={isEditing ? editedPost.image : post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-gray-600 text-center px-4">
                <ImageIcon size={64} className="mx-auto mb-4 text-gray-400" />
                <p>
                  <span className="block text-xl font-semibold mb-2">Beitragsbild</span>
                  <span className="block">1000 x 600 Pixel</span>
                  <span className="block text-sm mt-2">Format: JPG, PNG oder WebP</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          {isEditing ? (
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleChange}
              rows={10}
              className="w-full p-2 border rounded"
            />
          ) : (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}

export default Post;
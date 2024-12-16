'use client';

import { resizeImage } from '@/utils/image';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNote, saveImage, updateNote } from '../lib/actions';

type NoteModalFormType = {
  modalId: string;
  boardId: number;
  note?: Note | null;
  mode: 'update' | 'create';
};

export default function NoteModalForm({
  modalId,
  boardId,
  note,
  mode,
}: NoteModalFormType) {
  if (!boardId) {
    return <></>;
  }

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [submiting, setSubmiting] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    setSubmiting(true);
    setTimeout(() => {
      mode == 'create'
        ? createNoteHandler(data, boardId)
        : updateNoteHandler(data);
      setSubmiting(false);
      closeModal();
      formRef.current?.reset();
    }, 500);
  };

  async function uploadImage(noteId: number | null) {
    if (!imageFile || !noteId) return;
    resizeImage(imageFile, 720, 720, async (resizedDataUrl) => {
      await saveImage(noteId, resizedDataUrl);
      router.refresh();
    });
  }

  const createNoteHandler = async (data: Note, boardId: number) => {
    const noteId = await createNote(data, boardId);
    await uploadImage(noteId);

    router.refresh();
  };

  const updateNoteHandler = async (data: Note) => {
    await updateNote(data);
    await uploadImage(data.id);

    router.refresh();
  };

  const closeModal = () => {
    if (closeButtonRef) {
      closeButtonRef.current?.click();
    } else {
      console.error('Close button is not available.');
    }
  };

  return (
    <div className="modal" id={modalId} tabIndex={-1}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {mode === 'update' && (
          <input
            type="hidden"
            defaultValue={note?.id}
            {...register('id', { required: true, valueAsNumber: true })}
          ></input>
        )}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === 'create' ? 'Create note' : 'Update note'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0])}
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title && 'is-invalid'}`}
                  placeholder="Your note title"
                  defaultValue={note?.title}
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <div className="invalid-feedback">Title is required</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  rows={5}
                  className="form-control"
                  placeholder="Type any simple content"
                  defaultValue={note?.content ?? ''}
                  {...register('content')}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={closeButtonRef}
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={submiting}
                type="submit"
                className={`btn btn-primary ${
                  submiting ? 'btn-loading disabled' : null
                }`}
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

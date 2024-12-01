'use client';

import { createBoard, updateBoard } from '@/app/boards/lib/script';
import { Board, Prisma } from '@prisma/client';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type BoardModalFormType = {
  board?: Board | null;
  modalId: string;
  mode: 'update' | 'create';
  onSubmited?: (board: Board) => void;
};

export default function BoardModalForm({ ...props }: BoardModalFormType) {
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [submiting, setSubmiting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Board>();

  const onSubmit: SubmitHandler<Board> = (data) => {
    setSubmiting(true);
    setTimeout(() => {
      props.mode == 'create'
        ? createBoardHandler(data)
        : updateBoardHandler(data);
      setSubmiting(false);
      closeModal();
      formRef.current?.reset();
    }, 500);
  };

  const createBoardHandler = async (data: Board) => {
    const board: Prisma.BoardCreateWithoutUserInput = {
      title: data.title,
      description: data.description,
    };

    await createBoard(1, board);
    if (props.onSubmited) props.onSubmited(data);
  };

  const updateBoardHandler = async (data: Board) => {
    if (!props.board?.id) return;

    data.id = props.board?.id;

    await updateBoard(data);
    if (props.onSubmited) props.onSubmited(data);
  };

  const closeModal = () => {
    if (closeButtonRef) {
      closeButtonRef.current?.click();
    } else {
      console.error('Close button is not available.');
    }
  };

  return (
    <div className="modal" id={props.modalId} tabIndex={-1}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {props.mode === 'create' ? 'Create board' : 'Update board'}
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
                  defaultValue={''}
                  type="file"
                  className="form-control"
                  name="image"
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title && 'is-invalid'}`}
                  placeholder="Your board title"
                  defaultValue={props.board?.title}
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <div className="invalid-feedback">Title is required</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type any description"
                  defaultValue={props.board?.description ?? ''}
                  {...register('description')}
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
                {props.mode === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

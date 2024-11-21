import Header from '@/components/Header';
import BoardFormModal from '@/components/modals/BoardFormModal';
import NavMenu from '@/components/NavMenu';
import Note from '@/components/Note';
import Page from '@/components/Page';
import PageBody from '@/components/PageBody';
import PageContainer from '@/components/PageContainer';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const cards = [1, 2, 3, 4, 5];

  return (
    <Page>
      <Header></Header>
      <NavMenu></NavMenu>
      <PageContainer>
        <PageHeader preTitle="Home" title="How do you know this is a board?">
          <div className="btn-list">
            <a
              href="#"
              className="btn btn-primary d-none d-sm-inline-block"
              data-bs-toggle="modal"
              data-bs-target="#new-board-modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create new note
            </a>
            <BoardFormModal
              modalId="new-board-modal"
              mode="create"
            ></BoardFormModal>
          </div>
        </PageHeader>
        <PageBody>
          <div className="row row-deck">
            {cards.map((i) => (
              <div className="col-md-4 mb-3">
                <Note></Note>
              </div>
            ))}
          </div>
        </PageBody>
      </PageContainer>
      <PageFooter></PageFooter>
    </Page>
  );
}

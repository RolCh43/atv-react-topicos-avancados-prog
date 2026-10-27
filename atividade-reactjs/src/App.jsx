import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Section from './components/Section/Section.jsx';
import ProductCatalog from './components/ProductCatalog/ProductCatalog.jsx';
import FileUpload from './components/FileUpload/FileUpload.jsx';
import NotificationCenter from './components/NotificationCenter/NotificationCenter.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import Accordion from './components/Accordion/Accordion.jsx';
import ToastContainer from './components/Toast/ToastContainer.jsx';
import { faqItems } from './data/faq.js';
import './App.css';

/**
 * Componente principal: orquestra o layout e os demais componentes.
 */
export default function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="container main" tabIndex={-1}>
        <div className="hero">
          <h1>Atividade ReactJS — Componentes Visuais</h1>
          <p>
            Uma loja fictícia que demonstra Acordeão, Paginação, Barra de Progresso, Abas,
            Menu Suspenso e Notificações Toast, construídos com React.
          </p>
        </div>

        <Section
          id="produtos"
          title="Catálogo de produtos"
          description="Use os menus suspensos para filtrar e ordenar, e a paginação para navegar."
        >
          <ProductCatalog />
        </Section>

        <div className="grid-2">
          <Section
            id="upload"
            title="Upload de arquivos"
            description="Simulação de envio com barra de progresso."
          >
            <FileUpload />
          </Section>

          <Section
            id="notificacoes"
            title="Central de notificações"
            description="Dispare notificações toast de diferentes tipos."
          >
            <NotificationCenter />
          </Section>
        </div>

        <Section
          id="perfil"
          title="Meu perfil"
          description="Conteúdo organizado em abas (use as setas do teclado para navegar)."
        >
          <UserProfile />
        </Section>

        <Section id="faq" title="Perguntas frequentes" description="Clique em uma pergunta para ver a resposta.">
          <Accordion items={faqItems} />
        </Section>
      </main>

      <Footer />

      {/* Container global das notificações (lê o estado do ToastContext) */}
      <ToastContainer />
    </>
  );
}

import React from "react";

const Home = () => {
  return (
    <div
      style={{
        alignItems: "center",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ marginTop: "50px" }}>
        <p>
          Bem-vindo(a) ao To-Do List - Sua Lista de Tarefas Simplificada!
          <br /> <br />
          Organize sua rotina, priorize suas tarefas e conquiste mais
          produtividade com facilidade. Nossa ferramenta oferece uma interface
          intuitiva para você criar, editar e acompanhar suas tarefas diárias.
        </p>
      </div>
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          padding: "20px",
          width: "100%",
        }}
      >
        <p style={{ flex: 1, padding: "0 10px", textAlign: "center" }}>
          <strong>Principais Funcionalidades:</strong>
          <br />
          <br />
          <strong>Adicione Tarefas:</strong> Anote rapidamente suas pendências
          com apenas um clique.
          <br />
          <br />
          <strong>Categorias Personalizáveis:</strong> Separe suas tarefas por
          categorias como Trabalho, Estudos, ou Pessoal.
          <br />
          <br />
          <strong>Marcações Concluídas:</strong> Risque as tarefas concluídas e
          acompanhe seu progresso.
        </p>
      </div>
    </div>
  );
};

export default Home;

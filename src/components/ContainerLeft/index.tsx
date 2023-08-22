import { Elipses } from '../Elipses';
import './style.css';

export const ContainerLeft = () => {
  return (
    <section className="intro">
      <div className="intro-info">
        <h1 className="title">GoFinance</h1>
        <p className="info-text">
          O empréstimo ponto a ponto mais popular do mundo
        </p>
        <button className="btn-intro">Read More</button>
      </div>
      <Elipses />
    </section>
  );
};

import "../styles/card.css";
import numeral from "numeral";

const Card = ({ title, todayCases, allCases }) => {
  return (
    <div className="card">
      <h1 className={title === "Deaths" ? "red" : ""}>{title}</h1>
      <p class="big">+{numeral(`${todayCases}`).format("0.0a")}</p>
      <small>+{numeral(`${allCases}`).format("0.0a")} Total</small>
    </div>
  );
};

export default Card;

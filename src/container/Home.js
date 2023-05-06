import "../css/style.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/authContext";
const Home = (props) => {
  const [tours, setTours] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useContext(AuthContext);
  useEffect(() => {
    if (ctx.tours.length !== 0) {
      setTours(ctx.tours);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [ctx.tours]);
  return (
    <Fragment>
      {tours && (
        <main className="main">
          <div className="card-container">
            {tours.map((tour, i) => {
              const dateStr = tour.startDates[0];
              const date = new Date(dateStr);
              const options = {
                day: "numeric",
                month: "long",
                year: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              return (
                <div className="card" key={tour.id}>
                  <div className="card__header">
                    <div className="card__picture">
                      <div className="card__picture-overlay">&nbsp;</div>
                      <img
                        src={require(`../img/tours/tour-${i + 1}-cover.jpg`)}
                        alt="Tour 1"
                        className="card__picture-img"
                      />
                    </div>

                    <h3 className="heading-tertirary">
                      <span>{tour.name}</span>
                    </h3>
                  </div>

                  <div className="card__details">
                    <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                    <p className="card__text">{tour.summary}</p>
                    <div className="card__data">
                      <div className="card__icon"></div>
                      <span>{tour.startLocation.description}</span>
                    </div>
                    <div className="card__data">
                      <div className="card__icon"></div>

                      <span>{formattedDate}</span>
                    </div>
                    <div className="card__data">
                      <div className="card__icon"></div>
                      <span>{`${tour.locations.length} stops`}</span>
                    </div>
                    <div className="card__data">
                      <div className="card__icon"></div>
                      <span>{`${tour.maxGroupSize} people`} </span>
                    </div>
                  </div>

                  <div className="card__footer">
                    <p>
                      <span className="card__footer-value">${tour.price}</span>
                      <span className="card__footer-text">per person</span>
                    </p>
                    <p className="card__ratings">
                      <span className="card__footer-value">
                        {tour.ratingsAverage}
                      </span>
                      <span className="card__footer-text">
                        rating ({tour.ratingsQuantity})
                      </span>
                    </p>
                    <Link
                      to={`tour/${tour.id}`}
                      className="btn btn--green btn--small">
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}
      {isLoading && (
        <main className="main">
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Home;

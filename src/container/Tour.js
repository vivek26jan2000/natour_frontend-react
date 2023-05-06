import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTourAction } from "../utils/actions";

const Tour = (props) => {
  const [tour, setTour] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { tourId } = useParams();

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const data = await getTourAction(tourId);
        setTour(data.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    sendReq();
  }, [tourId]);

  return (
    <Fragment>
      {tour && (
        <Fragment>
          <section className="section-header">
            <div className="header__hero">
              <div className="header__hero-overlay">&nbsp;</div>
              <img
                src={require(`../img/tours/${tour.imageCover}`)}
                className="header_hero-img"
                alt={tour.name}
              />
            </div>
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tour.name}</span>
              </h1>
              <div className="heading-box__group">
                <div className="heading-box__detail">
                  {/* <svg className="heading-box__icon">
                <use xlink:href="img/icons.svg#icon-clock"></use>
              </svg> */}
                  <span className="heading-box__text">
                    {tour.duration} days
                  </span>
                </div>
                <div className="heading-box__detail">
                  {/* <svg className="heading-box__icon">
                <use xlink:href="img/icons.svg#icon-map-pin"></use>
              </svg> */}
                  <span className="heading-box__text">
                    {tour.locations[0].description}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="section-description">
            <div className="overview-box">
              <div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div className="overview-box__detail">
                    {/* <svg className="overview-box__icon">
                  <use xlink:href="img/icons.svg#icon-calendar"></use>
                </svg> */}
                    <span className="overview-box__label">Next date</span>
                    <span className="overview-box__text">
                      {new Date(tour.startDates[0]).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    {/* <svg className="overview-box__icon">
                  <use xlink:href="img/icons.svg#icon-trending-up"></use>
                </svg> */}
                    <span className="overview-box__label">Difficulty</span>
                    <span className="overview-box__text">
                      {tour.difficulty}
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    {/* <svg className="overview-box__icon">
                  <use xlink:href="img/icons.svg#icon-user"></use>
                </svg> */}
                    <span className="overview-box__label">Participants</span>
                    <span className="overview-box__text">
                      {tour.maxGroupSize} people
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    {/* <svg className="overview-box__icon">
                  <use xlink:href="img/icons.svg#icon-star"></use>
                </svg> */}
                    <span className="overview-box__label">Rating</span>
                    <span className="overview-box__text">
                      {tour.ratingsAverage} / 5
                    </span>
                  </div>
                </div>

                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">
                    Your tour guides
                  </h2>

                  {tour.guides.map((guide, i) => {
                    return (
                      <div className="overview-box__detail" key={guide._id}>
                        <img
                          src={require(`../img/users/${guide.photo}`)}
                          alt="Lead guide"
                          className="overview-box__img"
                        />
                        <span className="overview-box__label">
                          {guide.role}
                        </span>
                        <span className="overview-box__text">{guide.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="description-box">
              <h2 className="heading-secondary ma-bt-lg">
                About the {tour.name}
              </h2>
              <p className="description__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p className="description__text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum!
              </p>
            </div>
          </section>

          <section className="section-pictures">
            {tour.images.map((img) => {
              return (
                <div className="picture-box" key={img}>
                  <img
                    className="picture-box__img picture-box__img--1"
                    src={require(`../img/tours/${img}`)}
                    alt="The Park Camper Tour 1"
                  />
                </div>
              );
            })}
          </section>

          <section className="section-reviews">
            <div className="reviews">
              {tour.reviews.map((review) => {
                return (
                  <div className="reviews__card" key={review.id}>
                    <div className="reviews__avatar">
                      <img
                        src={require(`../img/users/${review.user.photo}`)}
                        alt="Jim Brown"
                        className="reviews__avatar-img"
                      />
                      <h6 className="reviews__user">{review.user.name}</h6>
                    </div>
                    <p className="reviews__text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque dignissimos sint quo commodi corrupti accusantium
                      veniam saepe numquam.
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img
                  src={require(`../img/logo-white.png`)}
                  alt="Natours logo"
                  className=""
                />
              </div>

              <div className="cta__content">
                <h2 className="heading-secondary">What are you waiting for?</h2>
                <p className="cta__text">
                  {tour.duration} days. 1 adventure. Infinite memories. Make it
                  yours today!
                </p>
                <button className="btn btn--green span-all-rows">
                  Book tour now!
                </button>
              </div>
            </div>
          </section>
        </Fragment>
      )}
      {isLoading && (
        <main className="main">
          <div
            className="loading">
            <h1>Loading...</h1>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Tour;

import React from "react";
import Loader from "../common/Loader";
import Image from "next/image";

const JobCard = (props) => {
  const { post, loading } = props;

  return (
    <>
      <div className="post-card">
        <div className="posted">
          <span className="posted-text">⏳ Posted 9 days ago </span>
        </div>

        <div className="post-body">
          <div className="job-company">
            <div className="col-one">
              <Image src={post?.logoUrl} width={25} height={40} />
            </div>
            <div className="col-two">
              <div className="name">
                <span>{post?.companyName}</span>
              </div>
              <div className="role">
                <h2>{post?.jobRole}</h2>
              </div>
              <div className="location">
                <p>{post?.location}</p>
              </div>
            </div>
          </div>

          <div className="salary">
            <p>
              Estimated Salary: {post?.salaryCurrencyCode}{" "}
              {post?.minJdSalary || 0}- {post?.maxJdSalary || 0} ✅
            </p>
          </div>

          <div className="description">
            <div className="desc-title">
              <p>Job Description:</p>
            </div>

            <div className="desc">
              <span>{post?.jobDetailsFromCompany}</span>
            </div>
          </div>

          <div className="show-more">
            <span className="show-more-btn">Show More</span>
          </div>

          <div className="min-exp-title">
            <h3 className="min-exp">Minimum Experience</h3>
          </div>
          <div className="exp">
            <h2>
              {post?.minExp || 0} {post?.minExp > 1 ? "Years" : "Year"}
            </h2>
          </div>

          <button className="apply-btn">⚡ Easy Apply</button>
        </div>
      </div>

      {loading && <Loader />}

      <style jsx>{`
        .post-card {
          max-width: 360px;
          min-height: 565px;
          background-color: white;
          border-radius: 20px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px 0px;
          transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          margin: 20px;
          padding: 5px;
        }
        /* Define a separate class for the hover effect */
        .post-card:hover {
          /* Change each individual property of the box-shadow */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .posted {
          padding: 4px 6px;
          box-shadow: rgba(6, 6, 6, 0.05) 0px 2px 6px 0px;
          border-radius: 10px;
          border: 1px solid rgb(230, 230, 230);
          max-width: 109px;
          margin: 5px;
        }

        .posted-text {
          font-size: 9px;
          font-weight: 400;
        }

        .post-body {
          padding: 8px 16px;
        }

        .job-company {
          display: flex;
          text-transform: capitalize;
        }

        .col-two {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
        }

        .location {
          font-size: 11px;
          font-weight: 500;
          margin-top: 5px;
        }

        .role {
          h2 {
            font-size: 14px;
            line-height: 1.5;
            font-weight: 400;
          }
        }

        .name {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 3px;
          color: #8b8b8b;
        }

        .description {
          margin-top: 15px;
        }

        .desc-title {
          margin: 0px;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 500;
        }

        .desc {
          height: 250px;
          overflow: hidden;
          white-space: pre-wrap;
          font-size: 14px;
          mask-image: linear-gradient(
            rgb(255, 255, 255),
            rgb(255, 255, 255),
            rgba(255, 255, 255, 0)
          );
          color:rgba(0, 0, 0, 0.87);
          font-weight: 400;
        }

        .show-more {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .show-more-btn {
          cursor: pointer;
          color: #4943da;
          text-decoration: none;
          font-size: 14px !important;
          font-weight: 400 !important;
        }

        .min-exp-title {
          margin-top: 10px;
          h3 {
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 3px;
            color: #8b8b8b;
          }
        }

        .exp {
          h2 {
            font-size: 14px;
            line-height: 1.5;
            font-weight: 400;
          }
        }

        .apply-btn {
          width: 100%;
          background-color: rgb(85, 239, 196);
          color: rgb(0, 0, 0);
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 8px;
          margin-top: 13px;
          outline: 0px;
          border: 0px;
          font-size: 16px;
          line-height: 1.75;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default JobCard;

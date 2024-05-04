import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <div className="loader-dot red"></div>
          <div className="loader-dot yellow"></div>
          <div className="loader-dot green"></div>
        </div>
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          background-color: transparent;
          z-index: 0;
        }
        
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100px;
        }

        .loader-dot {
          width: 8px;
          height: 20px;
          border-radius: 10px;
          margin: 0 5px;
          animation-name: bounce;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
          }
          50% {
            transform: translateY(0);
          }
        }

        .red {
          background-color: red;
          animation-delay: 0.3s;
        }

        .yellow {
          background-color: yellow;
          animation-delay: 0.6s;
        }

        .green {
          background-color: green;
          animation-delay: 0.9s;
        }
      `}</style>
    </>
  );
};

export default Loader;

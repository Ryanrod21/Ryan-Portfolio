import { reviewsData } from "../data/ReviewsData";
import { IoIosStar } from "react-icons/io";
import { motion } from "motion/react";

function ReviewsSection() {
  const renderedReviews = reviewsData.map((item, index) => {
    
    return (
      <motion.div 
      className="review-card" 
      key={index}
      initial={{ opacity: 0, scale: 0}}
      whileInView={{ opacity: 1, scale:1 }} 
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      >
        <div className="card-inner">
          <div className="star-container">
            <IoIosStar color="yellow" size={40} />
            <IoIosStar color="yellow" size={40} />
            <IoIosStar color="yellow" size={40} />
            <IoIosStar color="yellow" size={40} />
            <IoIosStar color="yellow" size={40} />
          </div>
          <p style={{ fontStyle: "italic" }}>{`" ${item.review} "`}</p>
          {item.reviewName && (
            <p style={{ fontWeight: "bold", marginTop: "20px" }}>
              {item.reviewName}
            </p>
          )}
          {item.reviewTitle && (
            <p style={{ fontWeight: "bold", marginTop: "20px" }}>
              {item.reviewTitle}
            </p>
          )}
        </div>
      </motion.div>
    );
  });

  return (
    <>
      <div className="review-section">
        <span className="blur-span left"></span>
        <span className="blur-span right"></span>
        <div className='gradient-top'></div>
        <div className='gradient-bottom'></div>
        <h2>Client Reviews</h2>
        <div className="review-container">{renderedReviews}</div>
      </div>
    </>
  );
}

export default ReviewsSection;

document.addEventListener("DOMContentLoaded", function () {
    const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Reemplaza por el Place ID de tu negocio
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const reviewsContainer = document.querySelector(".review-list");
    let displayedReviews = 0;
    const reviewsPerPage = 5;
    let allReviews = [];
  
    function renderStars(rating) {
      const fullStars = "★".repeat(Math.floor(rating));
      const emptyStars = "☆".repeat(5 - Math.floor(rating));
      return fullStars + emptyStars;
    }
  
    function displayReviews() {
      const slice = allReviews.slice(displayedReviews, displayedReviews + reviewsPerPage);
      slice.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
          <img src="${review.profile_photo_url || 'https://via.placeholder.com/70'}" alt="${review.author_name}">
          <div class="review-content">
            <div class="stars">${renderStars(review.rating)}</div>
            <p>${review.text}</p>
          </div>`;
        reviewsContainer.appendChild(card);
      });
      displayedReviews += slice.length;
  
      if (displayedReviews < allReviews.length && !document.querySelector(".more-reviews")) {
        const more = document.createElement("div");
        more.className = "more-reviews";
        more.innerHTML = `<a href="#">View more...</a>`;
        more.querySelector("a").addEventListener("click", (e) => {
          e.preventDefault();
          more.remove();
          displayReviews();
        });
        reviewsContainer.appendChild(more);
      }
    }
  
    service.getDetails({ placeId: placeId, fields: ["reviews", "rating"] }, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
        allReviews = place.reviews;
        const avgRating = place.rating.toFixed(1);
        document.querySelector(".average-stars").innerHTML = `★`.repeat(Math.round(avgRating)) +
          `<span>(${avgRating}/5)</span>`;
        displayReviews();
      } else {
        reviewsContainer.innerHTML += `<p>Unable to load reviews right now.</p>`;
      }
    });
  });
  
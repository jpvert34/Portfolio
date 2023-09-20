$(document).ready(function () {
  $("a.scroll-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

let articles = document.querySelectorAll(".article");
for (let article of articles) {
  article.addEventListener("click", function () {
    let target = document.querySelector(article.getAttribute("data-target"));
    target.style.display = "block";
  });
}

let closes = document.querySelectorAll(".close");
for (let close of closes) {
  close.addEventListener("click", function () {
    let modal = close.closest(".modal");
    modal.style.display = "none";
  });
}

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

$(document).ready(function () {
  // Au défilement
  $(window).scroll(function () {
    // Si le défilement dépasse 100 pixels depuis le haut, affichez le bouton
    if ($(this).scrollTop() > 100) {
      $("#goTop").removeClass("hidden").addClass("block").css("opacity", "1");
    } else {
      $("#goTop").css("opacity", "0").addClass("hidden").removeClass("block");
    }
  });

  // Lorsque vous cliquez sur le bouton, revenez en haut de la page
  $("#goTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    let formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "sendemail.php",
      data: formData,
      success: function () {
        // success: function (response) {
        // console.log(response); // Pour voir la réponse du serveur
        alert("Message envoyé avec succès!");
      },
      error: function () {
        // error: function (error) {
        // console.log(error); // Pour voir l'erreur retournée
        alert("Une erreur s’est produite. Veuillez réessayer.");
      },
    });
  });
});

grecaptcha.ready(function () {
  grecaptcha
    .execute("6LedY48oAAAAAH6CN9wG_OGTK9e_--odPsdHMLNs", { action: "submit" })
    .then(function (token) {
      // Ajoutez le token à un champ caché ou utilisez-le pour la vérification du côté serveur
      document.getElementById("g-recaptcha-response").value = token;
    });
});

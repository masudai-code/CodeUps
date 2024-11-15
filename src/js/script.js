jQuery(function ($) {
  // ハンバーガーメニュー
  $(".js-hamburger").click(function () {
    $(this).toggleClass("is-open");
    $(".js-drawer").fadeToggle();
  });

  // ドロワーナビのaタグをクリックで閉じる
  $(".js-drawer a[href]").on("click", function () {
    $(".js-hamburger").removeClass("is-open");
    $(".js-drawer").fadeOut();
  });

  // hamburger-resizeイベント
  $(window).on("resize", function () {
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").fadeOut();
    }
  });

  // MV
  const swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  // campaign-リサイズ処理（PC時のみ矢印表示）
  const campaign_slideLength = document.querySelectorAll(
    ".js-campaign-swiper .swiper-slide"
  ).length;
  $(window).resize(function () {
    campaign_arrow();
  });
  campaign_arrow();
  function campaign_arrow() {
    if (
      window.matchMedia("(max-width: 767px)").matches ||
      campaign_slideLength <= 3
    ) {
      $(".js-campaign-arrow").hide();
    } else {
      $(".js-campaign-arrow").show();
    }
  }

  // campaign-swiper
  var campaign__swiper = new Swiper(".js-campaign-swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: 1.3105,
    spaceBetween: 26,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
    breakpoints: {
      768: {
        slidesPerView: 3.96784,
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // ページトップボタン
  $(".js-page-top").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  // スクロールイベントでボタンの位置を調整
  $(window).on("scroll", function () {
    let scrollHeight = $(document).height();
    let scrollPosition = $(window).height() + $(window).scrollTop();
    let footHeight = $("footer").innerHeight();
    let windowWidth = $(window).width(); // 画面幅を取得

    // デフォルトの位置を設定
    let bottomPosition = windowWidth <= 768 ? 16 : 20;

    // フッター手前に来た場合、ボタンの位置を調整
    if (scrollHeight - scrollPosition <= footHeight) {
      $(".js-page-top").css({
        position: "fixed",
        bottom:
          footHeight - (scrollHeight - scrollPosition) + bottomPosition + "px",
      });
    } else {
      $(".js-page-top").css({
        position: "fixed",
        bottom: bottomPosition + "px",
      });
    }
  });

  // アニメーション
  //要素の取得とスピードの設定
  var box = $(".colorbox"),
    speed = 700;

  //.information__imgの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });
});

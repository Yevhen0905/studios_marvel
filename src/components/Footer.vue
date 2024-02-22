<template>
  <div>
    <footer class="footer">
      <div class="footer_container">
        <div class="footer_content">
          <div class="footer_link">
            <a class="footer_link_item" href="https://www.marvel.com/corporate/about" target="_blank"> ABOUT MARVEL </a>
            <a class="footer_link_item" href="https://developer.marvel.com/ " target="_blank"> project source </a>
          </div>
          <a href="#">
            <img class="footer_img" src="../assets/marvel-chrome-icon-194.png" alt="" />
          </a>
          <div class="social_block">
            <p class="social_block_text">FOLLOW MARVEL</p>
            <div class="social_block_link">
              <div class="social">
                <a class="social_link" href="http://instagram.com/marvel" target="_blank">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
              <div class="social">
                <a class="social_link" href="http://facebook.com/marvel" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </div>
              <div class="social">
                <a class="social_link" href="http://twitter.com/marvel" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <span class="footer_caption"> © 2023 MARVEL </span>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  };
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    background-color: rgb(17, 15, 11);
  }

  .footer_container {
    max-width: 1350px;
    width: 100%;
    margin: 0 auto;
    padding: 15px 0;
  }

  .footer_content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }

  .footer_img {
    width: 150px;
    opacity: 0.7;
  }

  .footer_link {
    display: flex;
    gap: 20px;
    flex-direction: column;
    font-family: 'Roboto';
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.1em;
    align-items: center;
  }

  .footer_block {
    width: 100%;
  }

  .footer_block_item {
    display: flex;
  }

  .footer_link_item {
    display: block;
    text-decoration: none;
    color: #8d969f;
    font-family: inherit;
    transition: all 0.5s ease;

    &:hover {
      color: #f6f8fa;
    }
  }

  .social_block {
    font-family: 'Roboto';
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.1em;
  }

  .social_block_text {
    color: #8d969f;
    margin: 0 0 20px;
    padding: 0;
  }

  .social_block_link {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 25px;
  }

  .social_link {
    color: #8d969f;
    font-size: 30px;
    text-decoration: none;
    transition: all 0.5s ease;

    &:hover {
      color: #f6f8fa;
    }
  }

  .footer_caption {
    display: block;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
    color: #ed1d24;
  }

  @media screen and (max-width: 768px) {
    .footer_link,
    .social_block {
      font-size: 17px;
    }

    .social_link {
      font-size: 23px;
    }

    .footer_img {
      width: 100px;
    }
  }

  @media screen and (max-width: 500px) {
    .footer_link,
    .social_block {
      font-size: 12px;
    }

    .social_link {
      font-size: 12px;
    }

    .footer_caption {
      font-size: 11px;
    }

    .footer_img {
      width: 60px;
    }
  }
</style>

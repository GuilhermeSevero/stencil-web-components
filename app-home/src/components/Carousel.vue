<template>
  <my-carousel
    :autoplay-delay="3000"
    autoplay
    @change-slide="onChangeSlide"
  >
    <img
      class="item__image"
      src="https://assets.zenvia.com/images/home/Banner-Zenvia-CI_PT.png"
      alt=""
    />

    <img
      class="item__image_zenvia"
      src="https://zenvia-static.s3.amazonaws.com/zenvia_banner_v2.png"
      alt=""
    />
  </my-carousel>
</template>

<script>
export default {
  setup() {
    const onChangeSlide = (event) => {
      console.log('slide:', event.detail);
    }
  
    return {
      onChangeSlide
    }
  }
}
</script>

<style>
.item {
  position: relative;
  height: 100%;
}

.item__content {
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 3px;
}

.item__image {
  width: 100%;
  height: 100%;
  object-fit: cover
}

.item__image_zenvia {
  width: 100%;
  height: 100%;
  object-fit: fill
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
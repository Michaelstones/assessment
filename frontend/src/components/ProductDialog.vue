<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import type { IProduct, TSize } from "@/types/product.types";
import { ref, defineProps, defineEmits, computed } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Define the emits using `defineEmits`
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
// Define a ref to track the selected
const selectedIndex = ref(0);
const selectedMaterialIndex = ref(0);
const selectedSizeIndex = ref(0);
const availableQuantity = ref(0);
const qtyCounter = ref(1);

// store
const cartStore = useCartStore();
// Method to increase the quantity
const increaseQty = () => {
  qtyCounter.value += 1;
};
const colors = ref(props.product.color.map((c: IProduct) => c.name)); // Example colors
const colorDetails = ref(props.product.color.map((c: IProduct) => c.imgUrl));
const mappedSizes = ref(
  props.product.size.map((item: TSize) => ({
    sizeCode: item.name,
    quantity: item.qty,
  }))
);

const firstAvailableSize = computed(() => {
  return mappedSizes.value.find((item: any) => item.quantity > 0);
});

if (firstAvailableSize.value) {
  availableQuantity.value = firstAvailableSize.value.quantity;
}

const selectSize = (index: number, quantity: number) => {
  selectedSizeIndex.value = index;
  availableQuantity.value = quantity;
};
const selectColor = (index: number) => {
  selectedIndex.value = index;
};

const materials = ref(props.product.material.map((m: string) => m));
const selectMaterial = (index: number) => {
  selectedMaterialIndex.value = index;
};

// Method to decrease the quantity
const decreaseQty = () => {
  if (qtyCounter.value > 1) {
    qtyCounter.value -= 1;
  }
};

//  add to cart
const addToCart = () => {
  const mat = materials.value[selectedMaterialIndex.value];
  const col = colors.value[selectedIndex.value];
  const size = mappedSizes.value[selectedSizeIndex.value].sizeCode;
  const price = props.product.price;
  const qty = qtyCounter.value;
  const title = props.product.name;
  const img = colorDetails.value[selectedIndex.value];
  const id = props.product.id;
  const cartItem = {
    id,
    title,
    img,
    mat,
    col,
    size,
    price,
    qty,
  };

  // Update the global store
  cartStore.addItemToCart(cartItem);
  toast("Item added to cart", {
    autoClose: 1000,
  });
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-7"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
      <button @click="closeModal" class="absolute top-10 right-4 text-3xl">
        &times;
      </button>
      <div class="my-5">
        <div>
          <div
            id="toast"
            style="background: #000; border-left: #000; color: white"
            class="z-50 absolute text-black font-semibold"
          ></div>

          <div class="flex justify-between">
            <!-- image -->
            <div class="w-1/3 px-2 mx-auto">
              <img
                :src="colorDetails[selectedIndex]"
                class="object-cover"
                loading="lazy"
                width="400"
                height="400"
                id="o-main-image"
                :alt="product.name"
              />
            </div>
            <!-- details -->
            <div class="w-2/3 relative px-4">
              <div>
                <!-- textdetails -->
                <div class="flex flex-col items-start mt-5 gap-y-2">
                  <p class="text-gray-400 text-xl">Mini Ecommerce</p>

                  <h2 class="hover:underline font-semibold text-6xl">
                    {{ product.name }}
                  </h2>
                  <p class="font-semibold text-2xl text-gray-600">
                    NGN {{ product.price }}
                  </p>
                </div>
                <!-- size button -->
                <div class="my-3">
                  <p class="text-gray-400 text-xl mb-4">Size</p>
                  <div
                    class="flex items-center gap-x-4 w-full button-container"
                  >
                    <button
                      v-for="(item, index) in mappedSizes"
                      :key="item.sizeCode"
                      :class="[
                        'px-4 py-2 rounded-full w-[60px] text-center',
                        {
                          'bg-black text-white': index === selectedSizeIndex,
                          'opacity-50 line-through': item.quantity === 0,
                        },
                      ]"
                      :disabled="item.quantity === 0"
                      @click="selectSize(index, item.quantity)"
                    >
                      {{ item.sizeCode }}
                    </button>
                  </div>
                </div>
                <!-- Color button -->
                <div class="my-3">
                  <p class="text-gray-400 text-xl mb-4">Color</p>

                  <div class="flex items-center gap-x-4 w-full color-container">
                    <button
                      v-for="(color, index) in colors"
                      :key="color"
                      :class="[
                        'px-4 py-2 rounded-full w-fit text-center',
                        index === selectedIndex ? 'bg-black text-white' : '',
                      ]"
                      @click="selectColor(index)"
                    >
                      {{ color.toUpperCase() }}
                    </button>
                  </div>

                  <!-- Material button -->
                  <div class="my-3">
                    <p class="text-gray-400 text-xl mb-4">Material</p>

                    <div
                      class="material-container flex items-center gap-x-4 w-full"
                    >
                      <button
                        v-for="(material, index) in materials"
                        :key="material"
                        :class="[
                          'px-4 py-2 rounded-full w-fit text-center',
                          {
                            'bg-black text-white':
                              index === selectedMaterialIndex,
                          },
                        ]"
                        @click="selectMaterial(index)"
                      >
                        {{ material.toUpperCase() }}
                      </button>
                    </div>

                    <!-- incre/dre button -->
                    <div class="my-5">
                      <p class="text-gray-400 text-xl mb-4">Quantity</p>
                      <div class="flex items-center gap-x-4">
                        <div
                          class="px-6 py-4 border flex items-center gap-x-8 justify-between w-[200px]"
                        >
                          <span
                            id="overlay-decre"
                            class="cursor-pointer font-semibold"
                            @click="decreaseQty"
                            >-</span
                          >
                          <span
                            id="overlay-qty"
                            class="cursor-pointer font-semibold"
                            >{{ qtyCounter }}</span
                          >
                          <span
                            id="overlay-incre"
                            class="cursor-pointer font-semibold"
                            @click="increaseQty"
                            >+</span
                          >
                        </div>
                      </div>
                    </div>
                    <!-- add to cart button -->
                    <div
                      id="overlay-add-to-cart"
                      class="cursor-pointer px-6 py-4 border gap-x-8 justify-between w-[70%] text-center"
                      @click="addToCart"
                    >
                      Add to cart
                    </div>
                  </div>
                </div>
              </div>
              <!--  -->
            </div>
          </div>

          <!-- last part -->
        </div>
      </div>
    </div>
  </div>
</template>

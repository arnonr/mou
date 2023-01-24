<template>
  <!-- Table Container Card -->
  <div>
    <b-card>
      <div class="m-2">
        <b-row>
          <!-- Contact -->
          <b-col>
            <h4>ค้นหา</h4>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-form-group
            label="ชื่อความร่วมมือ/MOU Name"
            label-for="name"
            class="col-md-4"
          >
            <b-form-input
              id="name"
              v-model="advancedSearch.name"
              placeholder=""
            />
          </b-form-group>

          <b-form-group
            label="องค์กรคู่สัญญา/Partner Organization"
            label-for="partner"
            class="col-md-4"
          >
            <b-form-input
              id="partner"
              v-model="advancedSearch.partner"
              placeholder=""
            />
          </b-form-group>

          <b-form-group
            label="หน่วยงาน/Host Organization"
            label-for="host_id"
            class="col-md-4"
          >
            <v-select
              v-model="advancedSearch.host_id"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :clearable="true"
              placeholder="-- All Host --"
              :options="selectOptions.hosts"
            />
          </b-form-group>

          <b-form-group label="Type" label-for="type" class="col-md-4">
            <v-select
              v-model="advancedSearch.type"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :clearable="true"
              placeholder="-- All Type --"
              :options="selectOptions.types"
            />
          </b-form-group>

          <b-form-group
            label="Country"
            label-for="country_code"
            class="col-md-4"
          >
            <v-select
              v-model="advancedSearch.country_code"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :clearable="true"
              placeholder="-- All Country --"
              :options="selectOptions.countries"
            />
          </b-form-group>

          <b-form-group label="Status" label-for="status" class="col-md-4">
            <v-select
              v-model="advancedSearch.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :clearable="true"
              placeholder="-- All Status --"
              :options="selectOptions.statuses"
            />
          </b-form-group>

          <b-form-group
            label="วันที่เริ่ม"
            label-for="start_date"
            class="col-md-4"
          >
            <flat-pickr
              v-model="advancedSearch.start_date"
              placeholder="Start Date"
              class="form-control"
              :config="configDate"
            />
          </b-form-group>

          <b-form-group
            label="วันที่สิ้นสุด"
            label-for="end_date"
            class="col-md-4"
          >
            <flat-pickr
              v-model="advancedSearch.end_date"
              placeholder="End Date"
              class="form-control"
              :config="configDate"
            />
          </b-form-group>

          <b-form-group
            label="Is Publish"
            label-for="is_publish"
            class="col-md-4"
          >
            <v-select
              v-model="advancedSearch.is_publish"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :clearable="true"
              placeholder="-- All Publish --"
              :options="selectOptions.is_publish"
            />
          </b-form-group>
        </b-row>

        <b-row>
          <b-col>
            <b-button variant="outline-danger" @click="resetAdvancedSearch()">
              reset
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <b-card no-body>
      <b-overlay :show="isOverLay" opacity="0.3" spinner-variant="primary">
        <div class="m-2">
          <!-- Table Top -->
          <b-row>
            <b-col>
              <!-- <h3 class="text-center">Know-Drive-Research Fund-Project1</h3> -->
              <b-form-group class="float-left col-md-1">
                <v-select
                  v-model="perPage"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="selectOptions.perPage"
                  :clearable="false"
                />
              </b-form-group>
              <b-form-group class="float-left col-md-2">
                <v-select
                  v-model="orderBy"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="selectOptions.orderBy"
                  :clearable="false"
                />
              </b-form-group>
              <b-form-group class="float-left col-md-2">
                <v-select
                  v-model="order"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="selectOptions.order"
                  :clearable="false"
                />
              </b-form-group>

              <b-button
                variant="primary"
                @click="handleAddFormClick()"
                class="float-right"
              >
                ADD
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div class="m-2">
          <b-row>
            <b-col v-for="it of items" :key="it.id" cols="12" sm="6" md="2">
              <b-card
                :class="'mou-item-card pa-2 mou-item-' + it.status"
                :img-src="it.partner_logo_file"
                img-top
                img-alt="card img"
                :title="it.partner"
                class="position-static"
              >
                <hr />
                <b-card-text>
                  {{ it.host_name }}
                  <br />
                  <span style="font-size: 0.8em">
                    {{
                      dayjs(it.start_date).locale("th").format("DD/MM/BBBB") +
                      " - " +
                      dayjs(it.end_date).locale("th").format("DD/MM/BBBB")
                    }}
                  </span>
                  <br />
                </b-card-text>
              </b-card>
            </b-col>
            <!--  -->
          </b-row>

          <b-row>
            <b-col cols="12" class="text-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalItems"
                :per-page="perPage.code"
                align="center"
                aria-controls="my-mou"
                @change="onChangePage"
              />
            </b-col>
          </b-row>
        </div>

        <mou-form
          v-model="isModal"
          :isSubmit="isSubmit"
          :item="item"
          :selectOptions="selectOptions"
          @on-submit="onSubmit()"
        />

        <!-- <mou-view v-model="isViewModal" :item="item" /> -->
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BSpinner,
  BOverlay,
  BFormCheckbox,
  BFormGroup,
  BCardText,
  BPaginationNav,
} from "bootstrap-vue";
import vSelect from "vue-select";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useMou from "./useMou";

import MouForm from "./MouForm.vue";
// import ProjectView from "./ProjectView.vue";

import mouStoreModule from "./mouStoreModule";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BSpinner,
    BOverlay,
    BFormCheckbox,
    vSelect,
    MouForm,
    BFormGroup,
    flatPickr,
    BPagination,
    BCardText,
    dayjs,
    BPaginationNav,
    // ProjectView,
  },
  data() {
    return {
      configDate: {
        mode: "single",
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "Y-m-d",
        locale: Thai,
      },
    };
  },
  setup() {
    const MOU_APP_STORE_MODULE_NAME = "mou";

    // Register module
    if (!store.hasModule(MOU_APP_STORE_MODULE_NAME))
      store.registerModule(MOU_APP_STORE_MODULE_NAME, mouStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      // if (store.hasModule(PROJECT_APP_STORE_MODULE_NAME))
      // store.unregisterModule(PROJECT_APP_STORE_MODULE_NAME);
    });

    const {
      blankMou,
      items,
      item,
      isModal,
      isAddModal,
      // isViewModal,
      isSubmit,
      onDelete,
      isOverLay,
      selectOptions,
      advancedSearch,
      perPage,
      order,
      orderBy,
      totalItems,
      currentPage,
      totalPage,
      onChangePage,
      onSubmit,
    } = useMou();

    const handleFormClick = (data) => {
      item.value = data;
      isModal.value = true;
    };

    const handleAddFormClick = () => {
      item.value = JSON.parse(JSON.stringify(blankMou));
      isModal.value = true;
    };

    // const handleViewClick = (data) => {
    //     item.value = data.item;
    //     isViewModal.value = true;
    // };

    const handleDeleteClick = (data) => {
      item.value = data;
      onDelete();
    };

    // const handleChangeYear = (val) => {
    //     store.commit("mou/SET_YEAR", val);
    // };

    const resetAdvancedSearch = () => {
      advancedSearch.name = "";
      advancedSearch.partner = "";
      advancedSearch.host_id = null;
      advancedSearch.country_code = null;
      advancedSearch.start_date = null;
      advancedSearch.end_date = null;
      advancedSearch.type = null;
      (advancedSearch.is_publish = { title: "Publish", code: 1 }),
        (advancedSearch.status = null);
    };

    return {
      items,
      item,
      isModal,
      isAddModal,
      // isViewModal,
      isSubmit,
      onDelete,
      // handleViewClick,
      handleFormClick,
      handleAddFormClick,
      handleDeleteClick,
      // handleChangeYear,
      isOverLay,
      store,
      selectOptions,
      advancedSearch,
      perPage,
      order,
      orderBy,
      totalItems,
      currentPage,
      perPage,
      dayjs,
      totalPage,
      onChangePage,
      resetAdvancedSearch,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
// @import "@core/scss/vue/libs/vue-select.scss";
// @import "@core/scss/vue/libs/vue-flatpicker.scss";
.mou-item-card {
  border: 3px solid;
}
.mou-item-active {
  border-color: #99cc33;
}
.mou-item-warning {
  border-color: #ffcc00;
}
.mou-item-inActive {
  border-color: #888;
}
.form-control[readonly] {
  background-color: #fff;
}
</style>

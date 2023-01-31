<script>
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BCard,
  BBadge,
  BOverlay,
  BSpinner,
  BLink,
} from "bootstrap-vue";
import router from "../../../router";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Swal from "sweetalert2";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);


import { onUnmounted, ref, reactive } from "@vue/composition-api";
import store from "@/store";
import mouStoreModule from "../mouStoreModule";

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    BButton,
    BCard,
    BBadge,
    BOverlay,
    BSpinner,
    BLink,
    dayjs,
  },
  setup() {
    const MOU_VIEW_APP_STORE_MODULE_NAME = "mou-view";

    // Register module
    if (!store.hasModule(MOU_VIEW_APP_STORE_MODULE_NAME))
      store.registerModule(MOU_VIEW_APP_STORE_MODULE_NAME, mouStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MOU_VIEW_APP_STORE_MODULE_NAME))
        store.unregisterModule(MOU_VIEW_APP_STORE_MODULE_NAME);
    });

    const toast = useToast();
    const overLay = ref(false);

    if (localStorage.getItem("added") == 1) {
      toast({
        component: ToastificationContent,
        props: {
          title: "Added MOU",
          icon: "CheckIcon",
          variant: "success",
        },
      });

      localStorage.removeItem("added");
    }

    if (localStorage.getItem("updated") == 1) {
      toast({
        component: ToastificationContent,
        props: {
          title: "Updated MOU",
          icon: "CheckIcon",
          variant: "success",
        },
      });

      localStorage.removeItem("updated");
    }

    const item = ref({
      id: null,
      name: "",
      partner: "",
      partner_logo_file: null,
      partner_logo_file_old: null,
      mou_file_file: null,
      mou_file_old: null,
      host_id: { title: null, code: null },
      country_code: { title: null, code: null },
      start_date: null,
      end_date: null,
      address: "",
      type: { title: null, code: null },
      is_publish: { title: "Publish", code: 1 },
      partner_contact_name: "",
      partner_contact_phone: "",
      partner_contact_email: "",
      host_contact_name: "",
      host_contact_phone: "",
      host_contact_email: "",
    });

    store
      .dispatch("mou-view/fetchMou", { id: router.currentRoute.params.id })
      .then((response) => {
        const { data } = response.data;
        //
        item.value = data;
      })
      .catch((error) => {
        console.log(error);
        toast({
          component: ToastificationContent,
          props: {
            title: "Error Get MOU Information",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });

    const onConfirmDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          onDelete(id);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your file has been deleted.",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      });
    };

    const onDelete = (id) => {
      store
        .dispatch("mou-view/deleteMou", { id: id })
        .then((response) => {
          if (response.data.message == "success") {
            router.push({ name: "lists"});
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          let textErrors = "";
          Object.values(error.response.data.errors).forEach((textError) => {
            textErrors = textErrors + textError + "<br>";
          });
          errorToast(textErrors);
        });
    };

    return {
      item,
      overLay,
      dayjs,
      onConfirmDelete,
    };
  },
};
</script>

<style lang="scss">
.label {
  font-weight: bold;
}
</style>

<template>
  <b-card class="container-lg">
    <b-overlay
      :show="overLay"
      variant="light"
      opacity="0.3"
      blur="2px"
      rounded="sm"
      no-center
    >
      <b-container>
        <b-row>
          <b-col class="text-center">
            <h3>MOU Information</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <h4>ข้อมูลคู่สัญญา/Partner Information</h4>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-4">
            <img :src="item.partner_logo_file" alt="" style="width: 400px"
          /></b-col>
          <b-col>
            <span class="label">องค์กรคู่สัญญา/Partner Organization: </span>
            <span class="text-data">{{ item.name }}</span>
            <hr />
            <span class="label">ประเภทความร่วมมือ/MOU Type: </span>
            <span class="text-data">{{ item.type_name }}</span>
            <hr />
            <span class="label">ประเทศคู่สัญญา/Partner Country: </span>
            <span class="text-data">{{ item.country_name }}</span>
            <hr />
            <span class="label">ที่อยู่คู่สัญญา/Address: </span>
            <span class="text-data">{{ item.address }}</span>
            <hr />
            <span class="label">ชื่อผู้ประสานงาน/Partner Contact Name: </span>
            <span class="text-data"> {{ item.partner_contact_name }}</span>
            <hr />
            <span class="label">เบอร์ติดต่อ/Partner Contact Phone: </span>
            <span class="text-data">{{ item.partner_contact_phone }}</span>
            <hr />
            <span class="label">เมล/Partner Contact Email: </span>
            <span class="text-data">{{ item.partner_contact_email }}</span>
          </b-col>
        </b-row>
        <!--  -->
        <b-row>
          <b-col class="mt-4">
            <h4>ข้อมูลหน่วยงานผู้รับผิดชอบ/Host Information</h4>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-6">
            <span class="label">หน่วยงาน/Host Organization: </span>
            <span class="text-data">{{ item.host_name }}</span>
          </b-col>
          <b-col class="col-md-6">
            <span class="label">ชื่อผู้ประสานงาน/Host Contact Name: </span>
            <span class="text-data">{{ item.host_contact_name }}</span>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="col-md-6">
            <span class="label">เบอร์ผู้ประสานงาน/Host Contact Phone: </span>
            <span class="text-data">{{ item.host_contact_phone }}</span>
          </b-col>
          <b-col class="col-md-6">
            <span class="label">เมลผู้ประสานงาน/Host Contact Email: </span>
            <span class="text-data">{{ item.host_contact_email }}</span>
          </b-col>
        </b-row>

        <!--  -->
        <b-row>
          <b-col class="mt-4">
            <h4>ข้อมูล MOU/MOU Information</h4>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-6">
            <span class="label">ชื่อความร่วมมือ/MOU Name: </span>
            <span class="text-data">{{ item.name }}</span>
          </b-col>
          <b-col class="col-md-6">
            <span class="label">ไฟล์ MOU/File: </span>
            <span class="text-data">
              <b-link :href="item.mou_file" target="_blank">คลิก</b-link>
            </span>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-6">
            <span class="label">วันเริ่มสัญญา/Start Date: </span>
            <span class="text-data">{{
              dayjs(item.start_date).locale("th").format("DD/MM/BBBB")
            }}</span>
          </b-col>
          <b-col class="col-md-6">
            <span class="label">วันสิ้นสุดสัญญา/End Date: </span>
            <span class="text-data">{{
              dayjs(item.end_date).locale("th").format("DD/MM/BBBB")
            }}</span>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="mt-4">
            <b-button
              type="button"
              variant="primary"
              @click="
                $router.push({
                  name: 'mou-edit',
                  params: { id: item.id },
                })
              "
            >
              Edit MOU</b-button
            >
            <b-button
              type="button"
              variant="danger"
              @click="onConfirmDelete(item.id)"
            >
              Delete MOU</b-button
            >

            <b-button type="submit" variant="warning" class="float-right">
              Add Activity
            </b-button>
          </b-col>
        </b-row>
      </b-container>

      <!-- Button -->

      <template #overlay>
        <div>
          <div
            class="position-absolute"
            style="
              bottom: 10em;
              margin-left: auto;
              margin-right: auto;
              left: 0;
              right: 0;
              text-align: center;
            "
          >
            <b-spinner type="border" variant="primary"></b-spinner>
            <br />
            <span>Please wait...</span>
          </div>
        </div>
      </template>
    </b-overlay>
  </b-card>
</template>

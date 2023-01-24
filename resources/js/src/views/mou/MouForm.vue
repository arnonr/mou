<template>
  <div>
    <!-- modal user edit -->
    <b-modal
      ref="modalMouForm"
      id="modal-mou-form"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Mou Form"
      :visible="isModal"
      @ok="submit"
      :ok-disabled="isSubmit"
      :cancel-disabled="isSubmit"
      @change="(val) => $emit('update:is-modal', val)"
    >
      <b-overlay :show="isSubmit" opacity="0.17" spinner-variant="primary">
        <validation-observer ref="simpleRules">
          <b-form>
            <div class="row">
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <label for="name">ชื่อความร่วมมือ/MOU Name:</label>
                  <b-form-input
                    id="name"
                    placeholder=""
                    v-model="item.name"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
            <!--  -->
            <div class="row">
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Partner"
                  rules="required"
                >
                  <label for="partner"
                    >องค์กรคู่สัญญา/Partner Organization:</label
                  >
                  <b-form-input
                    id="partner"
                    placeholder=""
                    v-model="item.partner"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
            <!--  -->
            <div class="row">
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Host"
                  rules="required"
                >
                  <label for="host">หน่วยงาน/Host Organization:</label>
                  <v-select
                    input-id="host_id"
                    label="title"
                    v-model="item.host_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.hosts"
                    placeholder=""
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>

            <!--  -->
            <div class="row">
              <b-form-group class="col-md-4">
                <validation-provider
                  #default="{ errors }"
                  name="type"
                  rules="required"
                >
                  <label for="type">ประเภทความร่วมมือ / MOU Type:</label>
                  <v-select
                    input-id="type"
                    label="title"
                    v-model="item.type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.types"
                    placeholder=""
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="country_code"
                  rules="required"
                >
                  <label for="country_code"
                    >ประเทศคู่สัญญา/Partner Country:</label
                  >
                  <v-select
                    input-id="country_code"
                    label="title"
                    v-model="item.country_code"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.countries"
                    placeholder=""
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
            <!--  -->

            <div class="row">
              <b-form-group class="col-md">
                <validation-provider #default="{ errors }" name="Address">
                  <label for="address">ที่อยู่/Address:</label>
                  <b-form-textarea
                    id="address"
                    placeholder=""
                    v-model="item.address"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
            <!--  -->
            <div class="row">
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Is Publish"
                  rules="required"
                >
                  <label for="is_publish">เผยแพร่/Publish:</label>
                  <v-select
                    input-id="is_publish"
                    label="title"
                    v-model="item.is_publish"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.is_publish"
                    placeholder=""
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Start Date"
                  rules="required"
                >
                  <label for="start_date">วันที่เริ่ม/Start Date:</label>
                  <!--  -->
                  <flat-pickr
                    v-model="item.start_date"
                    placeholder="Start Date"
                    :config="configDate"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!--  -->
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="End Date"
                  rules="required"
                >
                  <label for="end_date">วันที่สิ้นสุด/End Date:</label>
                  <!--  -->
                  <flat-pickr
                    v-model="item.end_date"
                    placeholder="End Date"
                    :config="configDate"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>

            <!-- <div class="row">
              <b-form-group class="col-md">
                <validation-provider #default="{ errors }" name="Journal Type">
                  <label for="paper_type">Journal Type:</label>
                  <v-select
                    input-id="paper_type_id"
                    v-model="item.paper_type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.paper_type"
                    placeholder="Choose Type"
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Journal Status"
                >
                  <label for="paper_status">Journal Status:</label>
                  <v-select
                    input-id="paper_status_id"
                    v-model="item.paper_status"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.paper_status"
                    placeholder="Choose Status"
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group class="col-md">
                <validation-provider
                  #default="{ errors }"
                  name="Principal Investigator"
                >
                  <label for="pi">Principal Investigator:</label>
                  <v-select
                    input-id="pi_id"
                    v-model="item.pi"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="selectOptions.pi"
                    placeholder="Choose PI"
                    :clearable="false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div> -->

            <div class="row">
              <b-form-group class="col-md">
                <validation-provider #default="{ errors }" name="Partner Logo">
                  <label for="partner_logo_file">รูปโลโก้/Partner Logo:</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-button
                        :variant="`outline-${
                          item.partner_logo_file_old == null
                            ? 'dark'
                            : 'warning'
                        }`"
                        target="_blank"
                        :disabled="item.partner_logo_file_old == null"
                        :href="item.partner_logo_file_old"
                      >
                        <feather-icon icon="FileTextIcon" />
                        View File
                      </b-button>
                    </b-input-group-prepend>
                    <b-form-file
                      id="h-file"
                      v-model="item.partner_logo_file"
                      placeholder="Choose a new file or drop it here..."
                      drop-placeholder="Drop file here..."
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
            <!--  -->
            <div class="row">
              <b-form-group class="col-md">
                <validation-provider #default="{ errors }" name="MOU file">
                  <label for="mou_file">ไฟล์/MOU File:</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-button
                        :variant="`outline-${
                          item.mou_file_old == null ? 'dark' : 'warning'
                        }`"
                        target="_blank"
                        :disabled="item.mou_file_old == null"
                        :href="item.mou_file_old"
                      >
                        <feather-icon icon="FileTextIcon" />
                        View File
                      </b-button>
                    </b-input-group-prepend>
                    <b-form-file
                      id="mou-file"
                      v-model="item.mou_file"
                      placeholder="Choose a new file or drop it here..."
                      drop-placeholder="Drop file here..."
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </div>
          </b-form>
        </validation-observer>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import {
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormInput,
  BFormGroup,
  BSpinner,
  BOverlay,
  BFormCheckbox,
  BInputGroup,
  BInputGroupPrepend,
  BFormFile,
  BFormTextarea,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { ref } from "@vue/composition-api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BSpinner,
    BOverlay,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    BFormFile,
    required,
    email,
    vSelect,
    flatPickr,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  emits: ["on-submit"],
  model: {
    prop: "isModal",
    event: "update:is-modal",
  },
  props: {
    isModal: {
      type: Boolean,
      required: true,
    },
    isSubmit: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    selectOptions: {
      type: Object,
      required: true,
    },
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
  setup(props, { emit }) {
    const simpleRules = ref(null);

    const submit = (bvModalEvent) => {
      bvModalEvent.preventDefault();

      simpleRules.value.validate().then((success) => {
        if (success) {
          emit("on-submit");
        }
      });
    };

    return {
      submit,
      simpleRules,
    };
  },
};
</script>

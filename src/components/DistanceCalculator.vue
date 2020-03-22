<template>
  <b-container class="my-5">
    <div>
      <b-jumbotron header="DistC" lead="GPS Distance Calculator"></b-jumbotron>
      <p>
        Enter the data to calculate the distance between two geographical
        points.
        <a
          href="https://en.wikipedia.org/wiki/Decimal_degrees"
        >Decimal format</a>
        is required.
      </p>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Latitude from:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.latitudeFrom"
            type="number"
            step="any"
            min="-90"
            max="90"
            required
            placeholder="Enter latitude from"
            :state="latitudeValidate(form.latitudeFrom)"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">{{ latitudeMsg }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-2" label="Longitude from:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.longitudeFrom"
            type="number"
            step="any"
            min="-180"
            max="180"
            required
            placeholder="Enter longitude from"
            :state="longitudeValidate(form.longitudeFrom)"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">{{ longitudeMsg }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-3" label="Latitude to:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.latitudeTo"
            type="number"
            step="any"
            min="-90"
            max="90"
            required
            placeholder="Enter latitude to"
            :state="latitudeValidate(form.latitudeTo)"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">{{ latitudeMsg }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-4" label="Longitude to:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.longitudeTo"
            type="number"
            step="any"
            min="-180"
            max="180"
            required
            placeholder="Enter longitude to"
            :state="longitudeValidate(form.longitudeTo)"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">{{ longitudeMsg }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Calculating method:">
          <b-form-radio-group
            id="radio-group-1"
            v-model="form.calculatingMethod"
            :options="options"
            name="radio-options"
            required
          ></b-form-radio-group>
        </b-form-group>
        <b-button class="mr-3" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Result" v-if="result">
        Distance [km]:
        <strong>{{ result.distanceKilometers }}</strong>
        <br />Distance [m]:
        <strong>{{ result.distanceMeters }}</strong>
        <br />Calculating method:
        <strong>{{ result.calculatingMethod == "vincenty" ? "Vincenty's" : "Haversine" }}</strong>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        latitudeFrom: null,
        longitudeFrom: null,
        latitudeTo: null,
        longitudeTo: null,
        calculatingMethod: null
      },
      options: [
        { text: "Vincenty's", value: "vincenty" },
        { text: "Haversine ", value: "haversine" }
      ],
      latitudeMsg: "Latitude value must be between -90 and 90",
      longitudeMsg: "Longitude value must be between -180 and 180",
      result: null
    };
  },
  methods: {
    latitudeValidate(value) {
      if (value === null) {
        return null;
      } else {
        return value >= -90 && value <= 90 ? true : false;
      }
    },
    longitudeValidate(value) {
      if (value === null) {
        return null;
      } else {
        return value >= -180 && value <= 180 ? true : false;
      }
    },
    onSubmit(e) {
      e.preventDefault();
      const baseURI = "http://localhost:8000/distance";
      this.$http
        .post(baseURI, this.form)
        .then(result => {
          this.result = result.data;
        })
        .catch(error => {
          this.result = error.message;
        });
    },
    onReset(e) {
      e.preventDefault();
      this.form.latitudeFrom = null;
      this.form.longitudeFrom = null;
      this.form.latitudeTo = null;
      this.form.longitudeTo = null;
      this.form.calculatingMethod = null;
      this.result = null;
    }
  }
};
</script>

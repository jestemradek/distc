import { expect } from "chai";
import BootstrapVue from 'bootstrap-vue';
import { mount, createLocalVue } from '@vue/test-utils';
import DistanceCalculator from "@/components/DistanceCalculator.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
const wrapper = mount(DistanceCalculator, { localVue });

describe('DistanceCalculator', () => {
  it('has a name', () => {
    expect(wrapper.html()).contain('DistC');
    expect(wrapper.html()).contain('GPS Distance Calculator');
    });
  it('has a form', () => {
    expect(wrapper.contains('#distc-form'));
  });
  it('has a submit button', () => {
    expect(wrapper.contains('.btn primary'));
  });
  it('latitude must be between -90 and 90', () => {
    expect(wrapper.vm.latitudeValidate(-91)).to.be.false;
    expect(wrapper.vm.latitudeValidate(-90)).to.be.true;
    expect(wrapper.vm.latitudeValidate(90)).to.be.true;
    expect(wrapper.vm.latitudeValidate(91)).to.be.false;
  });
  it('longitude must be between -180 and 180', () => {
    expect(wrapper.vm.longitudeValidate(-181)).to.be.false;
    expect(wrapper.vm.longitudeValidate(-180)).to.be.true;
    expect(wrapper.vm.longitudeValidate(180)).to.be.true;
    expect(wrapper.vm.longitudeValidate(181)).to.be.false;
  });
})
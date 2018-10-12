import ZaModal from '@/modal';
import { mount } from '../util';

describe('Modal', () => {
  it('create', () => {
    const wrapper = mount({
      components: { ZaModal },
      template: `
        <za-modal :visible.sync='visible' :title="title">
          模态框内容
        </za-modal>
      `,
      data() {
        return {
          visible: true,
          title: 'dialog',
        };
      },
    }, true);
    expect(wrapper.contains('.za-modal')).toBe(true);
    expect(wrapper.element.style.display).not.toBe('none');
  });

  it('render good', () => {
    const wrapper = mount({
      components: { ZaModal },
      template: `
        <za-modal :visible.sync='visible' :title="title">
          <span>模态框内容</span>
          <div slot='footer'><span>{{footer}}</span></div>
        </za-modal>
      `,
      data() {
        return {
          visible: true,
          title: 'dialog title',
          footer: 'this is footer',
        };
      },
    }, true);
    expect(wrapper.find('.za-modal-footer span').text()).toBe('this is footer');
    expect(wrapper.find('.za-modal-body span').text()).toBe('模态框内容');
  });

  it('open and close', () => {
    const wrapper = mount({
      components: { ZaModal },
      template: `
        <za-modal :visible.sync='visible' :title="title" :close-on-click-modal='true' :showClose='true'>
          <span>模态框内容</span>
          <div slot='footer'><span>{{footer}}</span></div>
        </za-modal>
      `,
      data() {
        return {
          visible: false,
          title: 'dialog title',
          footer: 'this is footer',
        };
      },
    }, true);
    wrapper.setData({ visible: true });
    expect(wrapper.attributes().style.display).not.toBe('none');
    wrapper.find('.za-mask').trigger('click');
    expect(wrapper.vm.visible).toBe(false);
    wrapper.setData({ visible: true });
    wrapper.find('.za-icon-wrong').trigger('click');
    expect(wrapper.vm.visible).toBe(false);
  });

  it('animation', () => {
    const wrapper = mount({
      components: { ZaModal },
      template: `
        <za-modal
          :visible.sync='visible'
          :title="title"
          :showClose='true'
          animationType="rotate"
          :animationDuration='animationDuration'
          :maskType='maskType'>
          <span>模态框内容</span>
          <div slot='footer'><span>{{footer}}</span></div>
        </za-modal>
      `,
      data() {
        return {
          visible: true,
          title: 'dialog title',
          footer: 'this is footer',
          animationDuration: 100,
          maskType: 'transparent',
        };
      },
    }, true);
    expect(wrapper.find('.za-modal-dialog').classes().includes('rotate-enter')).toBe(true);
    expect(wrapper.find('.za-mask').classes().includes('transparent')).toBe(true);
  });
});

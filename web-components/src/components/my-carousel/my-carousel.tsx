import {
  Component,
  Host,
  h,
  State,
  Element,
  Method,
  Prop,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'my-carousel',
  styleUrl: 'my-carousel.css',
  shadow: false,
  scoped: true,
})
export class ZCarousel {
  @Element() el: HTMLElement;

  @Prop() autoplay: boolean = false;

  @Prop({ attribute: 'autoplay-delay' }) autoplayDelay: number = 5000;

  @Prop({ attribute: 'hide-arrows' }) hideArrows: boolean = false;

  @Prop({ attribute: 'hide-dots' }) hideDots: boolean = false;

  @State() private currentSlide: number;

  @Event({ eventName: 'change-slide' }) onchange: EventEmitter<number>;

  @Event({ eventName: 'previous-slide' }) onPrevious: EventEmitter<void>;

  @Event({ eventName: 'next-slide' }) onNext: EventEmitter<void>;

  private slidesContainer!: Element;

  private interval: NodeJS.Timer = null;

  public get count(): number {
    return this.slidesContainer?.children?.length ?? 0;
  }

  @Watch('autoplay')
  autoplayWatch() {
    this.autoplayHandler();
  }

  @Watch('autoplayDelay')
  autoplayDelayWatch() {
    this.autoplayHandler();
  }

  @Method()
  public async next(): Promise<void> {
    this.change(this.currentSlide + 1);
    this.onNext.emit();
  }

  @Method()
  public async previous(): Promise<void> {
    this.change(this.currentSlide - 1);
    this.onPrevious.emit();
  }

  @Method()
  public async change(index: number): Promise<void> {
    this.currentSlide = this.getConsolidatedIndex(index);

    const slides = this.slidesContainer?.children ?? [];
    if (slides.length) {
      for (let count = 1; count <= this.count; count++) {
        const display = this.currentSlide === count ? 'block' : 'none';

        (slides[count - 1] as HTMLElement).style.display = display;
      }
    }

    this.autoplayHandler();

    this.onchange.emit(index);
  }

  private getConsolidatedIndex(index: number): number {
    if (index > this.count) {
      return 1;
    }

    if (index < 1) {
      return this.count;
    }

    return index;
  }

  private autoplayHandler(): void {
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null;
    }

    if (this.autoplay) {
      this.interval = setTimeout(() => this.next(), this.autoplayDelay);
    }
  }

  componentDidLoad() {
    this.change(1);
  }

  render() {
    return (
      <Host>
        <div class="slideshow-container">
          <div
            ref={(el) => this.slidesContainer = el}
          >
            <slot />
          </div>

          {!this.hideArrows
            ? (
              <slot name='arrows'>
                <a class="prev" onClick={() => this.previous()}>&#10094;</a>
                <a class="next" onClick={() => this.next()}>&#10095;</a>
              </slot>
            ) : ''
          }
        </div>

        <slot name='footer'>
          <div class="has-text-center">
            {!this.hideDots
              ? Array(this.count)
                  ?.fill('')
                  ?.map((_: any, index: number): any => (
                    <span
                      class={{
                        dot: true,
                        active: this.currentSlide === (index + 1),
                      }}
                      onClick={(): Promise<void> => this.change(index + 1)}
                    ></span>
                  ))
              : ''
            }
          </div>
        </slot>
      </Host>
    );
  }

}

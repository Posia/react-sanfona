function getProgress(timestampNow, timestampStart, duration) {
  const progress = (timestampNow - timestampStart) / duration;
  const percents = progress > 0 ? (progress < 1 ? progress * 100 : 100) : 0;
  const inProgress = percents < 100;

  return {
    percents,
    inProgress
  };
}

function getFullHeight(element) {
  const { marginTop, marginBottom } = window.getComputedStyle(element);
  return (
    element.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom)
  );
}

export function getChildrenHeight(node) {
  return [...node.children]
    .map(child => getFullHeight(child))
    .reduce((sum, height) => (sum += height), 0);
}

export class Animation {
  constructor(duration = 0) {
    this._duration = duration;
    this._frameId = null;
    this._animationHandlers = { collapse: [], expand: [] };
    this._afterAnimationHandlers = { collapse: [], expand: [] };
  }

  addCollapseHandler(handler) {
    this._animationHandlers.collapse.push(handler);

    return this;
  }

  addAfterCollapseHandler(handler) {
    this._afterAnimationHandlers.collapse.push(handler);

    return this;
  }

  addExpandHandler(handler) {
    this._animationHandlers.expand.push(handler);

    return this;
  }

  addAfterExpandHandler(handler) {
    this._afterAnimationHandlers.expand.push(handler);

    return this;
  }

  collapse() {
    this._cancelAnimation();
    this._runAnimation(
      this._animationHandlers.collapse,
      this._afterAnimationHandlers.collapse
    );
  }

  expand() {
    this._cancelAnimation();
    this._runAnimation(
      this._animationHandlers.expand,
      this._afterAnimationHandlers.expand
    );
  }

  _cancelAnimation() {
    window.cancelAnimationFrame(this.frameId);
  }

  _runAnimation(animationHandlers, afterAnimationHandlers) {
    const timestampStart = window.performance.now();
    const step = timestampNow => {
      const progress = getProgress(
        timestampNow,
        timestampStart,
        this._duration
      );

      animationHandlers.forEach(handler => handler(progress));

      if (progress.inProgress) {
        this._frameId = window.requestAnimationFrame(step);
      } else {
        afterAnimationHandlers.forEach(handler => handler(progress));
      }
    };

    this._frameId = window.requestAnimationFrame(step);
  }
}

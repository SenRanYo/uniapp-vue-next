// fade：渐隐渐显效果。初始化时透明度为0，打开时透明度为1，关闭时透明度回到0。
// zoom：缩放效果。初始化时缩放比例为0.8，打开时缩放比例为1，关闭时缩放比例回到0.8。
// fade-zoom：渐隐渐显和缩放的组合效果。
// fade-top：从上方渐隐渐显的效果。初始化时元素在垂直方向上偏移100%，打开时偏移回到0，关闭时偏移回到100%。
// fade-bottom：从下方渐隐渐显的效果。初始化时元素在垂直方向上偏移-100%，打开时偏移回到0，关闭时偏移回到-100%。
// fade-left：从左侧渐隐渐显的效果。初始化时元素在水平方向上偏移-100%，打开时偏移回到0，关闭时偏移回到-100%。
// fade-right：从右侧渐隐渐显的效果。初始化时元素在水平方向上偏移100%，打开时偏移回到0，关闭时偏移回到100%。
// slide-top：从上方滑入滑出的效果。
// slide-bottom：从下方滑入滑出的效果。
// slide-left：从左侧滑入滑出的效果。
// slide-right：从右侧滑入滑出的效果。

export default {
  fade: {
    init: [{ name: "opacity", value: 0, method: "opacity" }],
    open: [{ name: "opacity", value: 1, method: "opacity" }],
    close: [{ name: "opacity", value: 0, method: "opacity" }]
  },
  zoom: {
    init: [{ name: "transform", value: 0.9, method: "scale" }],
    open: [{ name: "transform", value: 1, method: "scale" }],
    close: [{ name: "transform", value: 0.9, method: "scale" }]
  },
  bounce: {
    init: [
      { name: "transform", value: 1, method: "scale" },
      { name: "transform", value: 1.5, method: "scale" }
    ],
    open: [{ name: "transform", value: 1, method: "scale" }],
    close: [{ name: "transform", value: 1, method: "scale" }]
  },
  "fade-zoom": {
    init: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: 0.9, method: "scale" }
    ],
    open: [
      { name: "opacity", value: 1, method: "opacity" },
      { name: "transform", value: 1, method: "scale" }
    ],
    close: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: 0.9, method: "scale" }
    ]
  },
  "fade-top": {
    init: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: [0, "100%", 0], method: "translate3d" }
    ],
    open: [
      { name: "opacity", value: 1, method: "opacity" },
      { name: "transform", value: [0, 0, 0], method: "translate3d" }
    ],
    close: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: [0, "100%", 0], method: "translate3d" }
    ]
  },
  "fade-bottom": {
    init: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: [0, "-100%", 0], method: "translate3d" }
    ],
    open: [
      { name: "opacity", value: 1, method: "opacity" },
      { name: "transform", value: [0, 0, 0], method: "translate3d" }
    ],
    close: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: [0, "-100%", 0], method: "translate3d" }
    ]
  },
  "fade-left": {
    init: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: ["-100%", 0, 0], method: "translate3d" }
    ],
    open: [
      { name: "opacity", value: 1, method: "opacity" },
      { name: "transform", value: [0, 0, 0], method: "translate3d" }
    ],
    close: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: ["-100%", 0, 0], method: "translate3d" }
    ]
  },
  "fade-right": {
    init: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: ["100%", 0, 0], method: "translate3d" }
    ],
    open: [
      { name: "opacity", value: 1, method: "opacity" },
      { name: "transform", value: [0, 0, 0], method: "translate3d" }
    ],
    close: [
      { name: "opacity", value: 0, method: "opacity" },
      { name: "transform", value: ["100%", 0, 0], method: "translate3d" }
    ]
  },
  "slide-top": {
    init: [{ name: "transform", value: [0, "100%", 0], method: "translate3d" }],
    open: [{ name: "transform", value: [0, 0, 0], method: "translate3d" }],
    close: [{ name: "transform", value: [0, "100%", 0], method: "translate3d" }]
  },
  "slide-bottom": {
    init: [{ name: "transform", value: [0, "-100%", 0], method: "translate3d" }],
    open: [{ name: "transform", value: [0, 0, 0], method: "translate3d" }],
    close: [{ name: "transform", value: [0, "-100%", 0], method: "translate3d" }]
  },
  "slide-left": {
    init: [{ name: "transform", value: ["-100%", 0, 0], method: "translate3d" }],
    open: [{ name: "transform", value: [0, 0, 0], method: "translate3d" }],
    close: [{ name: "transform", value: ["-100%", 0, 0], method: "translate3d" }]
  },
  "slide-right": {
    init: [{ name: "transform", value: ["100%", 0, 0], method: "translate3d" }],
    open: [{ name: "transform", value: [0, 0, 0], method: "translate3d" }],
    close: [{ name: "transform", value: ["100%", 0, 0], method: "translate3d" }]
  }
}

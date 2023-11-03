import * as echarts from 'echarts/core';
import {
    BarChart,
    LineChart,
    PieChart,
    HeatmapChart,
    CustomChart,
    MapChart,
    ScatterChart,
    PictorialBarChart,
    FunnelChart
} from 'echarts/charts';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    DataZoomComponent,
    AxisPointerComponent,
    MarkPointComponent,
    MarkAreaComponent,
    MarkLineComponent,
    TimelineComponent,
    PolarComponent,
    GridComponent,
    // 数据集组件
    DatasetComponent,
    // 内置数据转换器组件 (filter, sort)
    TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    HeatmapSeriesOption,
    CustomSeriesOption,
    MapSeriesOption,
    ScatterSeriesOption,
    PictorialBarSeriesOption,
    FunnelSeriesOption
} from 'echarts/charts';
import type {
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    ToolboxComponentOption,
    TooltipComponentOption,
    LegendComponentOption,
    VisualMapComponentOption,
    DataZoomComponentOption,
    AxisPointerComponentOption,
    MarkPointComponentOption,
    MarkAreaComponentOption,
    MarkLineComponentOption,
    TimelineComponentOption,
    PolarComponentOption,
    GridComponentOption,
    // 数据集组件
    DatasetComponentOption,
} from 'echarts/components';
import type {
    ComposeOption,
} from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
BarSeriesOption|
LineSeriesOption|
PieSeriesOption|
HeatmapSeriesOption|
CustomSeriesOption|
MapSeriesOption|
ScatterSeriesOption|
PictorialBarSeriesOption|
FunnelSeriesOption|
// 组件类型的定义后缀都为 ComponentOption
TitleComponentOption|
ToolboxComponentOption|
TooltipComponentOption|
LegendComponentOption|
VisualMapComponentOption|
DataZoomComponentOption|
AxisPointerComponentOption|
MarkPointComponentOption|
MarkAreaComponentOption|
MarkLineComponentOption|
TimelineComponentOption|
PolarComponentOption|
GridComponentOption|
// 数据集组件
DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    VisualMapComponent,
    BarChart,
    LineChart,
    PieChart,
    HeatmapChart,
    CustomChart,
    MapChart,
    DataZoomComponent,
    AxisPointerComponent,
    MarkPointComponent,
    MarkAreaComponent,
    MarkLineComponent,
    CanvasRenderer,
    ScatterChart,
    PictorialBarChart,
    TimelineComponent,
    FunnelChart,
    DatasetComponent,
    PolarComponent,
    LabelLayout,
    UniversalTransition,
    TransformComponent
]);

// const option: ECOption = {
//   // ...
// };
export{
    echarts,
    type ECOption
}
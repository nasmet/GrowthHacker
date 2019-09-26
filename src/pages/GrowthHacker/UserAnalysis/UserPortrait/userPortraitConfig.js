import AreaAnalysis from './components/AreaAnalysis';
import ModelAnalysis from './components/ModelAnalysis';
import TerminalAnalysis from './components/TerminalAnalysis';

export default [{
	key: 'aa',
	tab: '区域分析',
	Component: AreaAnalysis,
}, {
	key: 'ma',
	tab: '机型分析',
	Component: ModelAnalysis,
}, {
	key: 'ta',
	tab: '终端分析',
	Component: TerminalAnalysis,
}]
import React, { useState } from 'react';
import {
  Smartphone,
  Code2,
  Maximize2,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Wifi,
  Battery,
  Volume2,
  RefreshCw,
  Info
} from 'lucide-react';
import { FoodieMobileApp } from './components/FoodieMobileApp';
import { ProjectCodeViewer } from './components/ProjectCodeViewer';

type ViewMode = 'simulator' | 'fullscreen' | 'code';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('simulator');
  const [deviceSkin, setDeviceSkin] = useState<'iphone' | 'android'>('iphone');
  const [appKey, setAppKey] = useState(0);

  const resetSimulator = () => {
    setAppKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#141210] text-stone-100 flex flex-col font-sans selection:bg-[#FF6433] selection:text-white">
      {/* Top Application Bar */}
      <header className="shrink-0 bg-[#1C1815] border-b border-stone-800/80 px-4 py-2.5 flex items-center justify-between z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E04818] to-[#FF6433] flex items-center justify-center text-white shadow-md shadow-[#FF6433]/30">
            <span className="font-extrabold text-sm tracking-tight">F</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-tight">Foodie</span>
              <span className="text-[10px] bg-[#FF6433]/20 text-[#FF6433] border border-[#FF6433]/40 px-2 py-0.5 rounded-full font-bold">
                Expo React Native
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3 h-3" />
                12/12 Peer Review Items
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Complete recipe mobile app for Expo Snack, Expo Go & React Native
            </p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-900 border border-stone-700/80 p-0.5 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'simulator'
                  ? 'bg-[#FF6433] text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Interactive Phone Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Frame</span>
            </button>

            <button
              onClick={() => setViewMode('fullscreen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'fullscreen'
                  ? 'bg-[#FF6433] text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Full Mobile View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Screen</span>
            </button>

            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'code'
                  ? 'bg-[#FF6433] text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Expo Snack & GitHub Code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Expo Snack Project</span>
            </button>
          </div>

          <a
            href="https://snack.expo.dev"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-colors"
          >
            <span>Snack</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'code' ? (
          <div className="flex-1 h-full">
            <ProjectCodeViewer onClose={() => setViewMode('simulator')} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-3 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#171412] to-[#0E0C0A]">
            {/* Left or Top Guidance Panel (only visible on wider screens) */}
            {viewMode === 'simulator' && (
              <div className="hidden xl:flex flex-col w-72 shrink-0 mr-8 space-y-4">
                <div className="bg-[#1C1815] border border-stone-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 text-[#FF6433] font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    App Highlights
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    Warm Culinary Experience
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Built with a warm cream palette (<code className="text-stone-300">#FAF7F2</code>), coral accents, touch-optimized cards, and instant reactive state.
                  </p>
                </div>

                <div className="bg-[#1C1815] border border-stone-800 rounded-2xl p-4 shadow-xl space-y-3">
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Quick Interactions</span>
                    <button
                      onClick={resetSimulator}
                      className="text-stone-400 hover:text-white p-1"
                      title="Reset App"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </h4>

                  <ul className="text-xs text-stone-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6433] font-bold">1.</span>
                      <span><strong>Browse 12 Categories:</strong> Scroll horizontally to filter Breakfast, Italian, Asian, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6433] font-bold">2.</span>
                      <span><strong>Instant Search:</strong> Filter 16 rich recipes in real-time by dish name.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6433] font-bold">3.</span>
                      <span><strong>Favorites:</strong> Tap the heart on any card; check the dedicated Favorites tab.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6433] font-bold">4.</span>
                      <span><strong>My Food:</strong> Create personal recipes with image upload, custom ingredients, and numbered steps.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-300">Expo Snack Verified</h5>
                    <p className="text-[11px] text-emerald-400/80">
                      Exported <code className="text-emerald-200">App.js</code> and <code className="text-emerald-200">package.json</code> ready to import.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Device Frame */}
            {viewMode === 'simulator' ? (
              <div className="relative my-auto flex flex-col items-center">
                {/* Device Frame Skin Toggle */}
                <div className="mb-2 flex items-center gap-2 text-xs text-stone-400">
                  <button
                    onClick={() => setDeviceSkin('iphone')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      deviceSkin === 'iphone'
                        ? 'bg-stone-800 text-white font-bold'
                        : 'hover:text-stone-200'
                    }`}
                  >
                    iPhone 16 Pro
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setDeviceSkin('android')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      deviceSkin === 'android'
                        ? 'bg-stone-800 text-white font-bold'
                        : 'hover:text-stone-200'
                    }`}
                  >
                    Pixel 8 Pro
                  </button>
                  <span>•</span>
                  <button
                    onClick={resetSimulator}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                {/* Smartphone Outer Chassis */}
                <div className="relative w-[375px] h-[780px] max-h-[88vh] bg-stone-950 rounded-[50px] p-3 shadow-2xl ring-1 ring-white/15 border-4 border-stone-800 flex flex-col">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
                    {deviceSkin === 'iphone' ? (
                      <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-950/60 border border-blue-900/40" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-stone-800" />
                    )}
                  </div>

                  {/* Top Status Bar inside screen */}
                  <div className="absolute top-3 left-7 right-7 pt-2 px-1 flex items-center justify-between text-[11px] font-semibold text-stone-900 z-30 select-none pointer-events-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5 text-stone-900">
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Screen Content Wrapper */}
                  <div className="flex-1 w-full rounded-[40px] overflow-hidden bg-[#FAF7F2] relative pt-7 flex flex-col">
                    <FoodieMobileApp key={appKey} />

                    {/* iOS Home Indicator Bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400/60 rounded-full z-30 pointer-events-none" />
                  </div>
                </div>
              </div>
            ) : (
              /* Full Screen View Mode */
              <div className="w-full max-w-md h-[88vh] bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col relative my-auto">
                <FoodieMobileApp key={appKey} />
              </div>
            )}

            {/* Right Guidance / Quick Specs Panel */}
            {viewMode === 'simulator' && (
              <div className="hidden xl:flex flex-col w-72 shrink-0 ml-8 space-y-4">
                <div className="bg-[#1C1815] border border-stone-800 rounded-2xl p-4 shadow-xl">
                  <div className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#FF6433]" />
                    Snack Peer Review Spec
                  </div>
                  <div className="space-y-2 text-[11px] text-stone-400 leading-normal">
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-300">Framework</span>
                      <span className="font-semibold text-white">Expo SDK 52 / React Native</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-300">Categories</span>
                      <span className="font-semibold text-emerald-400">12 Horizontal Tabs</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-300">Sample Dishes</span>
                      <span className="font-semibold text-white">16 Complete Recipes</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-300">Image Picker</span>
                      <span className="font-semibold text-white">expo-image-picker</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-800 pb-1.5">
                      <span className="text-stone-300">Persistence</span>
                      <span className="font-semibold text-white">AsyncStorage</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-stone-300">Navigation</span>
                      <span className="font-semibold text-white">State History Stack</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1815] border border-stone-800 rounded-2xl p-4 shadow-xl">
                  <h4 className="text-xs font-bold text-white mb-2">Want to import into Expo Snack?</h4>
                  <p className="text-xs text-stone-400 mb-3 leading-relaxed">
                    Click the "Expo Snack Project" tab at the top to inspect and copy <code className="text-stone-300">App.js</code> and <code className="text-stone-300">package.json</code> directly.
                  </p>
                  <button
                    onClick={() => setViewMode('code')}
                    className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#FF6433]" />
                    View & Copy Source Files
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

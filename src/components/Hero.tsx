import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTAgMThjMC0zLjMxNCAyLjY4Ni02IDYtNnM2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container relative mx-auto px-4 text-center">
        <div className="mb-8 flex justify-center gap-4">
          <div className="animate-bounce-slow rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div className="animate-bounce-slow animation-delay-100 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <LineChart className="h-8 w-8 text-white" />
          </div>
          <div className="animate-bounce-slow animation-delay-200 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <PieChart className="h-8 w-8 text-white" />
          </div>
          <div className="animate-bounce-slow animation-delay-300 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
          DataVista
        </h1>
        
        <p className="mx-auto mb-4 max-w-2xl text-xl text-white/90 md:text-2xl">
          Turn your data into vision
        </p>
        
        <p className="mx-auto max-w-xl text-lg text-white/70">
          Upload your CSV files and watch as beautiful, interactive dashboards come to life—instantly.
        </p>
      </div>
    </section>
  );
};

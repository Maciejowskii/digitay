export default function ServicesLoading() {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 w-40 bg-zinc-200 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-zinc-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-10 w-24 bg-zinc-200 rounded-xl animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-zinc-100 p-4 rounded-xl flex items-center justify-between"
          >
             <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6 w-full">
                <div className="flex-1">
                  <div className="h-6 w-48 bg-zinc-100 rounded-md animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-start md:justify-end gap-6 flex-1">
                  <div className="min-w-[100px]">
                     <div className="h-6 w-20 bg-zinc-100 rounded-md animate-pulse"></div>
                  </div>
                  <div className="min-w-[120px]">
                     <div className="h-5 w-24 bg-zinc-100 rounded-md animate-pulse"></div>
                  </div>
                  <div className="min-w-[120px]">
                     <div className="h-6 w-24 bg-zinc-100 rounded-md animate-pulse"></div>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

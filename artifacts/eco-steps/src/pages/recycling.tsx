import { PageTransition } from "@/components/page-transition";
import { GlassCard } from "@/components/glass-card";
import { useGetRecyclingGuide } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Recycling() {
  const { data: guide, isLoading } = useGetRecyclingGuide();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    );
  }

  const filteredGuide = guide?.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.instructions.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(category => category.items.length > 0) || [];

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        
        <div>
          <h1 className="text-3xl font-bold">Recycling Guide</h1>
          <p className="text-muted-foreground mt-1">Not sure where to throw it? Search here.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search items (e.g. coffee cup, batteries...)" 
            className="pl-12 h-14 rounded-2xl bg-white/40 dark:bg-black/20 border-white/40 backdrop-blur-xl text-lg shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredGuide.map((category) => (
            <div key={category.id}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                {category.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <GlassCard key={item.id} className="p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      {item.canRecycle ? (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-md">
                          <CheckCircle className="w-4 h-4" /> Recyclable
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-bold bg-red-500/10 px-2 py-1 rounded-md">
                          <XCircle className="w-4 h-4" /> Trash
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-foreground/80 mb-4 flex-1">
                      {item.instructions}
                    </p>
                    
                    {item.tip && (
                      <div className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl mt-auto">
                        <Lightbulb className="w-5 h-5 shrink-0" />
                        <p>{item.tip}</p>
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
          
          {filteredGuide.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No items found matching "{search}"
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}

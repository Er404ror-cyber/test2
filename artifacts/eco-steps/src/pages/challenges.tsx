import { PageTransition } from "@/components/page-transition";
import { GlassCard } from "@/components/glass-card";
import { useGetChallenges, useCompleteChallenge, getGetChallengesQueryKey, getGetProfileQueryKey } from "@workspace/api-client-react";
import { Leaf, Droplets, Zap, Recycle, Car, ShoppingBag, Utensils, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  transport: Car,
  energy: Zap,
  food: Utensils,
  waste: Recycle,
  water: Droplets,
  shopping: ShoppingBag,
};

const diffColors: Record<string, string> = {
  easy: "bg-green-500/20 text-green-700 dark:text-green-400",
  medium: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  hard: "bg-red-500/20 text-red-700 dark:text-red-400"
};

export default function Challenges() {
  const { data: challenges, isLoading } = useGetChallenges();
  const completeChallenge = useCompleteChallenge();
  const queryClient = useQueryClient();

  const handleComplete = (id: number) => {
    completeChallenge.mutate({ id }, {
      onSuccess: (result) => {
        toast.success(`+${result.xpEarned} XP!`, {
          description: result.levelUp ? `Level Up! You are now level ${result.newLevel}` : "Great job completing a challenge!",
          icon: <Leaf className="w-5 h-5 text-primary" />
        });
        queryClient.invalidateQueries({ queryKey: getGetChallengesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-48 mb-4" />
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
      </div>
    );
  }

  const activeChallenges = challenges?.filter(c => !c.completed) || [];
  const completedChallenges = challenges?.filter(c => c.completed) || [];

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Daily Challenges</h1>
          <p className="text-muted-foreground mt-1">Complete tasks to earn XP and save the planet.</p>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {activeChallenges.map(challenge => {
              const Icon = iconMap[challenge.category] || Leaf;
              
              return (
                <GlassCard 
                  key={challenge.id} 
                  className="p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/40">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${diffColors[challenge.difficulty]}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                          {challenge.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleComplete(challenge.id)}
                    disabled={completeChallenge.isPending}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70 group whitespace-nowrap"
                    data-testid={`button-complete-${challenge.id}`}
                  >
                    <span className="group-hover:-translate-y-0.5 transition-transform">+{challenge.xpReward} XP</span>
                  </button>
                </GlassCard>
              );
            })}
          </AnimatePresence>

          {activeChallenges.length === 0 && (
            <GlassCard className="p-8 text-center flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">All Done!</h3>
              <p className="text-muted-foreground">You've completed all active challenges.</p>
            </GlassCard>
          )}
        </div>

        {completedChallenges.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Completed Today
            </h2>
            <div className="flex flex-col gap-3 opacity-60">
              {completedChallenges.map(challenge => {
                const Icon = iconMap[challenge.category] || Leaf;
                return (
                  <GlassCard key={challenge.id} className="p-4 flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-white/40 dark:bg-black/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{challenge.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

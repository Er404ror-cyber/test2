import { PageTransition } from "@/components/page-transition";
import { GlassCard } from "@/components/glass-card";
import { XPBar } from "@/components/xp-bar";
import { useGetProfile, useGetChallenges, useGetProfileStats } from "@workspace/api-client-react";
import { Flame, Star, Droplets, Zap, Recycle, Car, ShoppingBag, Utensils } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Challenge } from "@workspace/api-client-react/src/generated/api.schemas";
import { Link } from "wouter";

const iconMap: Record<string, React.ElementType> = {
  transport: Car,
  energy: Zap,
  food: Utensils,
  waste: Recycle,
  water: Droplets,
  shopping: ShoppingBag,
};

export default function Home() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: challenges, isLoading: challengesLoading } = useGetChallenges();
  const { data: stats, isLoading: statsLoading } = useGetProfileStats();

  if (profileLoading || challengesLoading || statsLoading) {
    return <HomeSkeleton />;
  }

  const todayChallenges = challenges?.filter(c => !c.completed).slice(0, 3) || [];

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mt-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hi, {profile?.username}! 👋</h1>
            <p className="text-muted-foreground text-lg">Let's save the planet today.</p>
          </div>
          
          <div className="flex gap-3">
            <GlassCard className="px-4 py-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span className="font-bold text-lg">{profile?.streak}</span>
            </GlassCard>
            <GlassCard className="px-4 py-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg">Lvl {profile?.level}</span>
            </GlassCard>
          </div>
        </header>

        {/* Next Level Progress */}
        <GlassCard className="p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Star className="w-32 h-32" />
          </div>
          <h3 className="text-lg font-bold mb-4">Journey to Level {profile ? profile.level + 1 : 2}</h3>
          <XPBar currentXP={profile?.xp || 0} targetXP={profile?.xpToNextLevel || 100} />
          <p className="text-sm text-muted-foreground mt-3">
            {profile && profile.xpToNextLevel - profile.xp} XP needed to level up
          </p>
        </GlassCard>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="CO2 Saved" value={`${stats?.co2Saved}kg`} icon={Cloud} color="text-slate-500" />
          <StatCard title="Water Saved" value={`${stats?.waterSaved}L`} icon={Droplets} color="text-blue-500" />
          <StatCard title="Plastic Avoided" value={`${stats?.plasticAvoided}g`} icon={Recycle} color="text-green-500" />
          <StatCard title="Trees Eq." value={`${stats?.treesEquivalent}`} icon={Leaf} color="text-emerald-500" />
        </div>

        {/* Today's Challenges Preview */}
        <div className="mt-4">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold">Today's Goals</h2>
            <Link href="/challenges" className="text-primary font-semibold hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayChallenges.map(challenge => {
              const Icon = iconMap[challenge.category] || Leaf;
              return (
                <GlassCard key={challenge.id} hover className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-white/60 dark:bg-black/40`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">
                      +{challenge.xpReward} XP
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{challenge.description}</p>
                  
                  <Link href="/challenges" className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-center mt-auto hover:bg-primary/90 transition-colors">
                    Start
                  </Link>
                </GlassCard>
              );
            })}
            
            {todayChallenges.length === 0 && (
              <GlassCard className="col-span-full p-8 text-center flex flex-col items-center">
                <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">You've completed all challenges for today. Great job for the planet!</p>
              </GlassCard>
            )}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: React.ElementType, color: string }) {
  return (
    <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
      <Icon className={`w-8 h-8 mb-2 ${color}`} />
      <span className="text-2xl font-black">{value}</span>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</span>
    </GlassCard>
  );
}

import { Cloud, Leaf, Trophy } from "lucide-react";

function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center mt-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 w-24 rounded-3xl" />
          <Skeleton className="h-12 w-24 rounded-3xl" />
        </div>
      </div>
      
      <Skeleton className="h-32 w-full rounded-3xl" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
      </div>
      
      <Skeleton className="h-8 w-48 mt-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-3xl" />)}
      </div>
    </div>
  );
}

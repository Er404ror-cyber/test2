import { PageTransition } from "@/components/page-transition";
import { GlassCard } from "@/components/glass-card";
import { XPBar } from "@/components/xp-bar";
import { useGetProfile, useGetProfileStats, useGetBadges } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Star, Trophy, Target, Award, Cloud, Droplets, Recycle, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const rarityColors: Record<string, string> = {
  common: "border-gray-400 text-gray-500",
  rare: "border-blue-400 text-blue-500 shadow-blue-500/20",
  epic: "border-purple-400 text-purple-500 shadow-purple-500/20",
  legendary: "border-yellow-400 text-yellow-500 shadow-yellow-500/30"
};

export default function Profile() {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: stats, isLoading: statsLoading } = useGetProfileStats();
  const { data: badges, isLoading: badgesLoading } = useGetBadges();

  if (profileLoading || statsLoading || badgesLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-32 w-full rounded-3xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        
        {/* User Card */}
        <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-card border-4 border-background flex items-center justify-center overflow-hidden">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-primary">{profile?.username?.[0]?.toUpperCase()}</span>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-3xl font-black">{profile?.username}</h1>
            <p className="text-muted-foreground font-medium mb-4">{profile?.title || "Eco Beginner"}</p>
            <XPBar currentXP={profile?.xp || 0} targetXP={profile?.xpToNextLevel || 100} />
          </div>

          <div className="flex gap-4 md:flex-col justify-center w-full md:w-auto">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-black/30 min-w-[80px]">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500 mb-1" />
              <span className="font-bold">{profile?.streak}</span>
              <span className="text-[10px] text-muted-foreground uppercase">Streak</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-black/30 min-w-[80px]">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mb-1" />
              <span className="font-bold">Lvl {profile?.level}</span>
              <span className="text-[10px] text-muted-foreground uppercase">Level</span>
            </div>
          </div>
        </GlassCard>

        {/* Impact Stats */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Lifetime Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox icon={Cloud} value={`${stats?.co2Saved}kg`} label="CO2 Saved" />
            <StatBox icon={Droplets} value={`${stats?.waterSaved}L`} label="Water Saved" />
            <StatBox icon={Recycle} value={`${stats?.plasticAvoided}g`} label="Plastic Avoided" />
            <StatBox icon={Leaf} value={`${stats?.treesEquivalent}`} label="Trees Planted" />
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badges?.map((badge) => (
              <GlassCard 
                key={badge.id}
                className={cn(
                  "p-4 flex flex-col items-center text-center transition-all duration-500",
                  badge.earned ? "" : "opacity-50 grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm",
                  badge.earned && badge.rarity ? rarityColors[badge.rarity] : "border-gray-200",
                  badge.earned && "shadow-lg"
                )}>
                  <Trophy className={cn(
                    "w-8 h-8",
                    badge.earned && badge.rarity ? rarityColors[badge.rarity].replace("border-", "text-").split(" ")[0] : "text-gray-400"
                  )} />
                </div>
                <h3 className="font-bold text-sm leading-tight mb-1">{badge.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">{badge.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}

function StatBox({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) {
  return (
    <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
      <Icon className="w-6 h-6 text-primary mb-2 opacity-80" />
      <span className="text-xl font-black">{value}</span>
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
    </GlassCard>
  );
}

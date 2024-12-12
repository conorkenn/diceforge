export const calculateChance = (
    difficulty: number,
    rollType: string,
    modifiers: string[]
  ) => {
    const { minTotal, maxTotal } = calculateModifierTotal(modifiers);

    if (difficulty > 20) difficulty = 20;

    const minDifficulty = Math.max(1, difficulty - maxTotal);
    const maxDifficulty = Math.max(1, difficulty - minTotal);

    const baseChanceMin = (21 - minDifficulty) / 20;
    const baseChanceMax = (21 - maxDifficulty) / 20;

    let resultChanceMin, resultChanceMax;

    if (rollType === "advantage") {
      const advantageChanceMin = 1 - Math.pow((minDifficulty - 1) / 20, 2);
      const advantageChanceMax = 1 - Math.pow((maxDifficulty - 1) / 20, 2);
      resultChanceMin = advantageChanceMin;
      resultChanceMax = advantageChanceMax;
    } else if (rollType === "disadvantage") {
      const disadvantageChanceMin = Math.pow((21 - minDifficulty) / 20, 2);
      const disadvantageChanceMax = Math.pow((21 - maxDifficulty) / 20, 2);
      resultChanceMin = disadvantageChanceMin;
      resultChanceMax = disadvantageChanceMax;
    } else {
      resultChanceMin = baseChanceMin;
      resultChanceMax = baseChanceMax;
    }

    return (((resultChanceMin + resultChanceMax) / 2) * 100).toFixed(2);
  };

  export const calculateModifierTotal = (modifiers: string[]) => {
    let staticModifier = 0;
    let minRollModifier = 0;
    let maxRollModifier = 0;
    modifiers.forEach((mod) => {
      if (mod.includes("d")) {
        const parts = mod.split("d");
        const diceCount = Math.abs(Number(parts[0]));
        const diceSides = Number(parts[1]);
        const isNegative = mod.startsWith("-");

        const diceMin = isNegative ? -1 : 1;
        const diceMax = isNegative
          ? -diceCount * diceSides
          : diceCount * diceSides;

        minRollModifier += diceMin;
        maxRollModifier += diceMax;
      } else {
        staticModifier += Number(mod);
      }
    });

    const minTotal = staticModifier + minRollModifier;
    const maxTotal = staticModifier + maxRollModifier;

    return { minTotal, maxTotal };
  };


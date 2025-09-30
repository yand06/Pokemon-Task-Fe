import { useState, useEffect } from "react";
import {
  catchPokemon,
  getPokemonDetail,
  type PokemonDetail,
} from "../../services/pokemon";
import { useModal } from "../../contexts/ModelContext";

interface UseBattlePokemonProps {
  name: string;
  onSuccess?: () => void;
}

export const useBattlePokemon = ({
  name,
  onSuccess,
}: UseBattlePokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caught, setCaught] = useState(false);
  const [pokemonVisible, setPokemonVisible] = useState(true);
  const [throwing, setThrowing] = useState(false);
  const [showBall, setShowBall] = useState(false);

  const { showConfirm, showInput } = useModal();

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await getPokemonDetail(name);
      if (!data) {
        setError("No Pokémon found");
        setLoading(false);
        return;
      }

      setPokemon(data);

      const myPokemons = JSON.parse(
        localStorage.getItem("myPokemons") || "[]"
      ) as { name: string; nickname: string }[]; // ✅ Type yang benar

      setCaught(myPokemons.some((p) => p.name === data.name));
      setLoading(false);
    };

    fetchData();
  }, [name]);

  const handleCatch = async () => {
    if (!pokemon) return;

    setThrowing(true);
    setShowBall(true);

    setTimeout(async () => {
      setThrowing(false);
      setShowBall(false);

      const success = Math.random() < 0.5;

      if (!success) {
        setPokemonVisible(false);

        // MODAL 1: Pokemon kabur
        await showConfirm({
          title: "Pokemon Escaped! 🏃‍♂️",
          message: `${pokemon.name} broke free and ran away! The wild Pokemon was too quick to catch this time.`,
          confirmText: "Try Again",
          cancelText: "Go Back",
          type: "warning",
        });

        return;
      }

      const nickname = await showInput({
        title: "Pokemon Caught! 🎉",
        message: `Amazing! You successfully caught ${pokemon.name}! Now give your new Pokemon a special nickname:`,
        placeholder: "Enter nickname...",
        defaultValue: pokemon.name,
        confirmText: "Save Pokemon",
        cancelText: "Release Pokemon",
        validation: (value: string) => {
          // Validation logic untuk nickname
          if (!value.trim()) return "Please enter a nickname for your Pokemon!";
          if (value.length < 2)
            return "Nickname must be at least 2 characters long!";
          if (value.length > 12)
            return "Nickname must be less than 12 characters!";

          const myPokemons = JSON.parse(
            localStorage.getItem("myPokemons") || "[]"
          ) as { name: string; nickname: string }[];

          if (
            myPokemons.some(
              (p) => p.nickname.toLowerCase() === value.toLowerCase()
            )
          ) {
            return "That nickname is already taken! Choose another one.";
          }

          return null;
        },
      });

      if (!nickname) {
        const releaseConfirm = await showConfirm({
          title: "Release Pokemon? 🔄",
          message:
            "Are you sure you want to release this Pokemon back to the wild? This action cannot be undone.",
          confirmText: "Yes, Release",
          cancelText: "Keep Pokemon",
          type: "warning",
        });

        if (releaseConfirm) {
          await showConfirm({
            title: "Pokemon Released",
            message: `${pokemon.name} has been released back to the wild. It waves goodbye as it disappears into nature.`,
            confirmText: "Continue",
            type: "info",
          });
        }
        return;
      }

      const isSaved = catchPokemon(pokemon, nickname);

      if (!isSaved) {
        await showConfirm({
          title: "Save Failed! ❌",
          message:
            "Something went wrong while saving your Pokemon. Please check your storage and try again.",
          confirmText: "OK",
          type: "error",
        });
        return;
      }

      setCaught(true);

      const goHome = await showConfirm({
        title: "Success! ✨",
        message: `Congratulations! ${pokemon.name} "${nickname}" has been added to your Pokemon collection! Ready to catch more Pokemon or return home?`,
        confirmText: "🏠 Go Home",
        cancelText: "🎯 Catch More",
        type: "pokemon",
      });

      console.log("Modal confirmed:", goHome);

      if (goHome) {
        console.log("About to navigate home...");

        setTimeout(() => {
          console.log("Executing navigation...");
          onSuccess?.();
        }, 500);
      }
    }, 1500);
  };

  const handleEscape = async () => {
    if (!pokemon) return;

    const confirmed = await showConfirm({
      title: "Escape Battle? 🏃‍♂️",
      message: `Are you sure you want to escape from the battle with ${pokemon.name}? You'll return to safety but miss the chance to catch this Pokemon.`, // ✅ Enhanced message
      confirmText: "Yes, Escape",
      cancelText: "Stay and Fight",
      type: "warning",
    });

    if (confirmed) {
      setPokemonVisible(false);
      setTimeout(() => {
        onSuccess?.();
      }, 500);
    }
  };

  return {
    pokemon,
    loading,
    error,
    caught,
    pokemonVisible,
    throwing,
    showBall,
    handleCatch,
    handleEscape,
  };
};

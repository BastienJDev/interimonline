import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const metiers = [
  // Gros œuvre
  { value: "macon", label: "Maçon", category: "Gros œuvre" },
  { value: "coffreur", label: "Coffreur / Bancheur", category: "Gros œuvre" },
  { value: "ferrailleur", label: "Ferrailleur", category: "Gros œuvre" },
  { value: "grutier", label: "Grutier", category: "Gros œuvre" },
  { value: "conducteur-engins", label: "Conducteur d'engins", category: "Gros œuvre" },
  { value: "chef-equipe-gros-oeuvre", label: "Chef d'équipe gros œuvre", category: "Gros œuvre" },
  
  // Second œuvre
  { value: "electricien", label: "Électricien", category: "Second œuvre" },
  { value: "plombier", label: "Plombier", category: "Second œuvre" },
  { value: "chauffagiste", label: "Chauffagiste", category: "Second œuvre" },
  { value: "climaticien", label: "Climaticien / Frigoriste", category: "Second œuvre" },
  { value: "plaquiste", label: "Plaquiste", category: "Second œuvre" },
  { value: "carreleur", label: "Carreleur", category: "Second œuvre" },
  { value: "peintre", label: "Peintre en bâtiment", category: "Second œuvre" },
  { value: "menuisier", label: "Menuisier", category: "Second œuvre" },
  { value: "serrurier-metallier", label: "Serrurier / Métallier", category: "Second œuvre" },
  { value: "couvreur", label: "Couvreur", category: "Second œuvre" },
  { value: "zingueur", label: "Zingueur", category: "Second œuvre" },
  { value: "etancheur", label: "Étancheur", category: "Second œuvre" },
  { value: "facades", label: "Façadier / Ravalement", category: "Second œuvre" },
  { value: "solier-moquettiste", label: "Solier / Moquettiste", category: "Second œuvre" },
  
  // Charpente / Structure
  { value: "charpentier", label: "Charpentier bois", category: "Charpente / Structure" },
  { value: "charpentier-metallique", label: "Charpentier métallique", category: "Charpente / Structure" },
  { value: "monteur-echafaudage", label: "Monteur échafaudeur", category: "Charpente / Structure" },
  
  // TP / VRD
  { value: "canalisateur", label: "Canalisateur", category: "TP / VRD" },
  { value: "terrassier", label: "Terrassier", category: "TP / VRD" },
  { value: "conducteur-pelle", label: "Conducteur de pelle", category: "TP / VRD" },
  { value: "conducteur-chargeuse", label: "Conducteur de chargeuse", category: "TP / VRD" },
  { value: "conducteur-compacteur", label: "Conducteur de compacteur", category: "TP / VRD" },
  { value: "regleur-finisseur", label: "Régleur / Finisseur", category: "TP / VRD" },
  { value: "poseur-bordures", label: "Poseur de bordures", category: "TP / VRD" },
  
  // Industrie
  { value: "soudeur", label: "Soudeur", category: "Industrie" },
  { value: "tuyauteur", label: "Tuyauteur industriel", category: "Industrie" },
  { value: "chaudronnier", label: "Chaudronnier", category: "Industrie" },
  { value: "mecanicien-industriel", label: "Mécanicien industriel", category: "Industrie" },
  { value: "electricien-industriel", label: "Électricien industriel", category: "Industrie" },
  { value: "technicien-maintenance", label: "Technicien de maintenance", category: "Industrie" },
  { value: "operateur-usinage", label: "Opérateur d'usinage", category: "Industrie" },
  { value: "tourneur-fraiseur", label: "Tourneur / Fraiseur", category: "Industrie" },
  { value: "regleur-machines", label: "Régleur de machines", category: "Industrie" },
  { value: "cariste", label: "Cariste", category: "Industrie" },
  { value: "magasinier", label: "Magasinier", category: "Industrie" },
  { value: "agent-production", label: "Agent de production", category: "Industrie" },
  
  // Encadrement
  { value: "chef-chantier", label: "Chef de chantier", category: "Encadrement" },
  { value: "conducteur-travaux", label: "Conducteur de travaux", category: "Encadrement" },
  { value: "geometre", label: "Géomètre / Topographe", category: "Encadrement" },
  
  // Autres
  { value: "manoeuvre", label: "Manœuvre / Aide", category: "Autres" },
  { value: "autre", label: "Autre métier", category: "Autres" },
];

// Group metiers by category
const groupedMetiers = metiers.reduce((acc, metier) => {
  if (!acc[metier.category]) {
    acc[metier.category] = [];
  }
  acc[metier.category].push(metier);
  return acc;
}, {} as Record<string, typeof metiers>);

interface MetierComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function MetierCombobox({ value, onValueChange }: MetierComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedMetier = metiers.find((m) => m.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedMetier ? selectedMetier.label : "Sélectionnez votre métier"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher un métier..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>Aucun métier trouvé.</CommandEmpty>
            {Object.entries(groupedMetiers).map(([category, categoryMetiers]) => (
              <CommandGroup key={category} heading={category}>
                {categoryMetiers.map((metier) => (
                  <CommandItem
                    key={metier.value}
                    value={metier.label}
                    onSelect={() => {
                      onValueChange(metier.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === metier.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {metier.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { metiers };

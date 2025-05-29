import { Link } from "@tanstack/react-router";
import { ContextAdmin } from "~/routes/__root";
import { ContentLayout } from "./content-layout";

type HeaderProps = {
  admin: ContextAdmin | null;
};

export const Header = ({ admin }: HeaderProps) => {
  return (
    <div className="border-b">
      <ContentLayout className="flex items-center justify-between py-0 font-semibold">
        <div className="flex gap-6">
          <Link to="/" className="py-4">
            <h1 className="text-lg font-extrabold">Campeonato Farofa</h1>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/championships" className="py-4">
              Campeonatos
            </Link>
            <Link to="/results" className="py-4">
              Resultados
            </Link>
            <Link to="/drivers" className="py-4">
              Pilotos
            </Link>
          </div>
        </div>

        {admin && <Link to="/admin/dashboard">Admin</Link>}
      </ContentLayout>
    </div>
  );
};

import "./Kanban.css";
import { useOutletContext } from "react-router";

const kanbanColumns = [
  {
    status: "Başvuruldu",
    title: "BAŞVURULDU",
  },
  {
    status: "İK Görüşmesi",
    title: "İK GÖRÜŞMESİ",
  },
  {
    status: "Teknik Mülakat",
    title: "MÜLAKAT",
  },
  {
    status: "Teklif",
    title: "TEKLİF",
  },
];

export default function Kanban() {
  const {
        applications,
        updateApplicationStatus,
    } = useOutletContext();

    function handleDragStart(event, applicationId) {
        event.dataTransfer.setData(
            "applicationId",
            String(applicationId)
        );

        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function handleDrop(event, newStatus) {
        event.preventDefault();
        const applicationId =
            event.dataTransfer.getData("applicationId");
        if (!applicationId) {
            return;
        }
        updateApplicationStatus(applicationId, newStatus);
    }

  return (
    <section className="kanban-page">
      <div className="kanban-page_container">
        <header className="kanban-page_header">
          <h1>Kanban Board</h1>
          <p>Başvuruları aşamalarına göre sürükleyerek yönet.</p>
        </header>

        <div className="kanban-board">
            {kanbanColumns.map((column) => {
                const columnApplications = applications.filter(
                (application) => application.status === column.status
                );

                return (
                    <section
                        className="kanban-column"
                        key={column.status}
                        onDragOver={handleDragOver}
                        onDrop={(e) => 
                            handleDrop(e,column.status)
                        }
                    >
                        <header className="kanban-column_header">
                        <h2>{column.title}</h2>

                        <span>{columnApplications.length}</span>
                        </header>

                        <div className="kanban-column_body">
                        {columnApplications.map((application) => (
                            <article
                                className="kanban-card"
                                key={application.id}
                                draggable
                                onDragStart={(e) =>
                                    handleDragStart(e,application.id)
                                }
                            >
                                <span className="kanban-card_logo">
                                    {application.company
                                    .charAt(0)
                                    .toLocaleUpperCase("tr-TR")}
                                </span>

                                <div className="kanban-card_content">
                                    <strong>{application.company}</strong>
                                    <p>{application.position}</p>
                                </div>
                            </article>
                        ))}
                        </div>
                    </section>
                );
            })}
        </div>
      </div>
    </section>
  );
}
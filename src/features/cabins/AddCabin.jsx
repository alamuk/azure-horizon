import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {
    return (
        <Modal>
            <Modal.OpenComp opens={"cabin-form"}>
                <Button>Add New cabin</Button>
            </Modal.OpenComp>
            <Modal.WindowComp name="cabin-form">
                <CreateCabinForm />
            </Modal.WindowComp>
        </Modal>
    );
}

export default AddCabin;

// -----------------------------------------------

// export function AddCabin() {
//     const [isOpenModal, setOpenModal] = useState(false);
//
//     return (
//         <div>
//             <Button onClick={() => setOpenModal((show) => !show)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setOpenModal(false)}>
//                     <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
//                 </Modal>
//             )}
//         </div>
//     );
// }

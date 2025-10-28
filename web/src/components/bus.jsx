import { Seat} from "../components/seat"

export function Bus() {
    return (
        <div className="flex flex-col w-full items-center justify-between bg-card shadow-md rounded-2xl p-2 lg:w-80">
            <h2 className="text-font text-2xl p-4">Selecione um assento</h2>
            <div className="flex items-center justify-center gap-4">
                <div className="grid grid-cols-2 p-2 gap-2">
                    <Seat status="available">1</Seat>
                    <Seat status="available">2</Seat>
                    <Seat status="available">3</Seat>
                    <Seat status="available">4</Seat>
                    <Seat status="available">5</Seat>
                    <Seat status="available">6</Seat>
                    <Seat status="available">7</Seat>
                    <Seat status="available">8</Seat>
                    <Seat status="available">9</Seat>
                    <Seat status="available">10</Seat>
                    <Seat status="available">11</Seat>
                    <Seat status="available">12</Seat>
                    <Seat status="available">13</Seat>
                    <Seat status="available">14</Seat>
                    <Seat status="available">15</Seat>
                    <Seat status="available">16</Seat>
                </div>

                <div className="grid grid-cols-2 p-2 gap-2">
                    <Seat status="available">17</Seat>
                    <Seat status="available">18</Seat>
                    <Seat status="available">19</Seat>
                    <Seat status="available">20</Seat>
                    <Seat status="available">21</Seat>
                    <Seat status="available">22</Seat>
                    <Seat status="available">23</Seat>
                    <Seat status="available">24</Seat>
                    <Seat status="available">25</Seat>
                    <Seat status="available">26</Seat>
                    <Seat status="available">27</Seat>
                    <Seat status="available">28</Seat>
                    <Seat status="available">29</Seat>
                    <Seat status="available">30</Seat>
                    <Seat status="available">31</Seat>
                    <Seat status="available">32</Seat>
                </div>
            </div>
        </div>
    )
}
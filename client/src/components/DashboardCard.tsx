
function DashboardCard({ data }) {
    return (
        <>
            <div
                className="bg-white w-36 md:w-60 h-24 flex items-start shadow-lg rounded-lg overflow-hidden mx-1"
            >
                <div className="px-1 h-full bg-[#0CC9E8]"></div>
                <div className="pl-4 pt-2">
                    <h2 className="text-md font-medium text-gray-700">{data[0]}</h2>
                    <p className="text-4xl font-bold text-gray-500">{data[1]}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardCard
// Reusable Year Selector Component
// Used in Hall of Fame, Gallery, and other pages with year filtering

export default function YearSelector({ years, selectedYear, onYearChange, label = "Select Year:" }) {
    return (
        <div className="flex items-center gap-4">
            <label htmlFor="year-select" className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                {label}
            </label>
            <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="px-4 py-2.5 text-base font-medium text-gray-900 bg-white border-2 border-blue-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}

import { motion } from "framer-motion"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import styles from "../styles/Dashboard.module.css"

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push("...")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            }
        }

        return pages
    }

    if (totalPages <= 1) return null

    return (
        <motion.div
            className={styles.pagination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <motion.button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
            >
                <HiChevronLeft />
            </motion.button>

            {getPageNumbers().map((page, index) => (
                <motion.button
                    key={index}
                    className={`${styles.paginationButton} ${page === currentPage ? styles.active : ""}`}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    whileHover={{ scale: page === "..." ? 1 : 1.05 }}
                    whileTap={{ scale: page === "..." ? 1 : 0.95 }}
                >
                    {page}
                </motion.button>
            ))}

            <motion.button
                className={styles.paginationButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
            >
                <HiChevronRight />
            </motion.button>

            <span className={styles.paginationInfo}>
        Showing {startItem}-{endItem} of {totalItems}
      </span>
        </motion.div>
    )
}

export default Pagination

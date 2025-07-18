import { motion } from "framer-motion";
import { HiUsers, HiSearch, HiFilter } from "react-icons/hi";
import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import Pagination from "./Pagination";
import AvatarWithFallback from '../../../components/AvatarWithFallback';
import api from '../../../services/api'; // Adjust path to your api.js

const UsersTab = ({ users }) => {
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Remove useEffect and local users state

    const filteredUsers = users.filter((user) => {
        const roleMatch = filter === "ALL" || user?.role === filter;
        const rawName = user?.role === "FREELANCER" ? user?.fullName : user?.companyName;
        const displayName = typeof rawName === 'string' ? rawName : '';
        const searchMatch = displayName.toLowerCase().includes(searchTerm.toLowerCase());

        return roleMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.pageTitle}>
                <HiUsers />
                All Users
            </div>

            {/* Filter and Search Container */}
            <motion.div
                className={styles.filterContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className={styles.filtersRow}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>
                            <HiSearch /> Search Users
                        </label>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search by name or company..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>
                            <HiFilter /> Filter by Role
                        </label>
                        <select
                            className={styles.dropdownSelect}
                            value={filter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value="ALL">All Users ({users.length})</option>
                            <option value="FREELANCER">Freelancers ({users.filter((u) => u.role === "FREELANCER").length})</option>
                            <option value="HIRER">Hirers ({users.filter((u) => u.role === "HIRER").length})</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <table className={styles.modernTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>User Details</th>
                            <th className={styles.tableHeader}>Type</th>
                            <th className={styles.tableHeader}>Premium Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <motion.tr
                                    key={user.userId}
                                    className={styles.tableRow}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td className={styles.tableCell}>
                                        <div className={styles.userInfo}>
                                            <AvatarWithFallback
                                                src={user.role === "FREELANCER" ? user.avatar : user.logoPath}
                                                alt={user.role === "FREELANCER" ? user.fullName || 'Unknown' : user.companyName || 'Unknown'}
                                                name={user.role === "FREELANCER" ? user.fullName || 'Unknown' : user.companyName || 'Unknown'}
                                                size={36}
                                                className={styles.userAvatar}
                                            />
                                            <div>
                                                <p className={styles.userName}>
                                                    {user.role === "FREELANCER" ? user.fullName || 'Unknown' : user.companyName || 'Unknown'}
                                                </p>
                                                <p className={styles.userType}>{user.role?.toLowerCase() || 'unknown'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span
                                            className={`${styles.badge} ${user.role === "FREELANCER" ? styles.badgeVerified : styles.badgeUnverified}`}
                                        >
                                            {user.role?.toLowerCase() || 'unknown'}
                                        </span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <span className={`${styles.badge} ${user.premium ? styles.badgePro : styles.badgeFree}`}>
                                            {user.premium ? "PRO" : "FREE"}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className={styles.emptyState}>
                                    <div className={styles.emptyStateIcon}>🔍</div>
                                    <div className={styles.emptyStateTitle}>No users found</div>
                                    <div className={styles.emptyStateDescription}>Try adjusting your search criteria</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    );
};

export default UsersTab;
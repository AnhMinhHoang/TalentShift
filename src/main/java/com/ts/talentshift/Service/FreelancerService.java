package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Freelancer.FreelancerSideBarUpdateDTO;
import com.ts.talentshift.DTO.Freelancer.LinkDTO;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Freelancer.*;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.SkillRepository;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FreelancerService {
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public FreelancerService(UserRepository userRepository, SkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public User updateFreelancerSideBar(Long userId, FreelancerSideBarUpdateDTO dto) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }

                    existingUser.setFullName(dto.getFullName());
                    existingUser.setAvatar(dto.getAvatar());
                    existingUser.setPhone(dto.getPhone());
                    existingUser.setLocation(dto.getLocation());
                    existingUser.setBirthDate(dto.getBirthDate());
                    updateFreelancerLinks(existingUser, dto.getLinks());
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }

                    // Update basic freelancer fields
                    existingUser.setBio(updatedUser.getBio());
                    existingUser.setLocation(updatedUser.getLocation());
                    existingUser.setBirthDate(updatedUser.getBirthDate());
                    existingUser.setPhone(updatedUser.getPhone());
                    existingUser.setFullName(updatedUser.getFullName());
                    existingUser.setAvatar(updatedUser.getAvatar());
                    existingUser.setFillingForm(true);

                    // Clear existing collections
                    existingUser.getExperiences().clear();
                    existingUser.getEducations().clear();
                    existingUser.getCertificates().clear();
                    existingUser.getLinks().clear();

                    // Step 1: Remove user from existing skills' users lists to sync the relationship
                    for (Skill skill : new ArrayList<>(existingUser.getSkills())) {
                        skill.getUsers().remove(existingUser);
                    }
                    existingUser.getSkills().clear();

                    // Step 2: Process updated skills
                    if (updatedUser.getSkills() != null) {
                        for (Skill updatedSkill : updatedUser.getSkills()) {
                            // Find existing skill by name and type
                            Skill existingSkill = skillRepository.findBySkillNameAndSkillType(
                                    updatedSkill.getSkillName(), updatedSkill.getSkillType());
                            if (existingSkill == null) {
                                // If not found, create a new skill
                                existingSkill = new Skill();
                                existingSkill.setSkillName(updatedSkill.getSkillName());
                                existingSkill.setSkillType(updatedSkill.getSkillType());
                                existingSkill.setUsers(new ArrayList<>());
                            }

                            // Add skill to user and user to skill, avoiding duplicates
                            if (!existingUser.getSkills().contains(existingSkill)) {
                                existingUser.getSkills().add(existingSkill);
                            }
                            if (!existingSkill.getUsers().contains(existingUser)) {
                                existingSkill.getUsers().add(existingUser);
                            }
                        }
                    }

                    // Add new items for other collections using helper methods
                    if (updatedUser.getExperiences() != null) {
                        updatedUser.getExperiences().forEach(experience -> {
                            if (experience.getProjects() != null) {
                                experience.getProjects().forEach(project -> {
                                    project.setExperience(experience);
                                });
                            }
                            experience.setUser(existingUser);
                            existingUser.getExperiences().add(experience);
                        });
                    }

                    if (updatedUser.getEducations() != null) {
                        updatedUser.getEducations().forEach(education -> {
                            education.setUser(existingUser);
                            existingUser.getEducations().add(education);
                        });
                    }

                    if (updatedUser.getCertificates() != null) {
                        updatedUser.getCertificates().forEach(certificate -> {
                            certificate.setUser(existingUser);
                            existingUser.getCertificates().add(certificate);
                        });
                    }

                    if (updatedUser.getLinks() != null) {
                        updatedUser.getLinks().forEach(link -> {
                            link.setUser(existingUser);
                            existingUser.getLinks().add(link);
                        });
                    }

                    // Save the user (cascades to skills and other collections)
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerBio(Long userId, String bio) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }
                    existingUser.setBio(bio);
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerSkills(Long userId, List<Skill> updatedSkills) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }

                    // Step 1: Remove user from existing skills' users lists to sync the relationship
                    for (Skill skill : new ArrayList<>(existingUser.getSkills())) {
                        skill.getUsers().remove(existingUser);
                    }
                    existingUser.getSkills().clear();

                    // Step 2: Process updated skills
                    if (updatedSkills != null) {
                        for (Skill updatedSkill : updatedSkills) {
                            // Find existing skill by name and type
                            Skill existingSkill = skillRepository.findBySkillNameAndSkillType(
                                    updatedSkill.getSkillName(), updatedSkill.getSkillType());
                            if (existingSkill == null) {
                                // If not found, create a new skill
                                existingSkill = new Skill();
                                existingSkill.setSkillName(updatedSkill.getSkillName());
                                existingSkill.setSkillType(updatedSkill.getSkillType());
                                existingSkill.setUsers(new ArrayList<>()); // Initialize users list
                            }

                            // Add skill to user and user to skill, avoiding duplicates
                            if (!existingUser.getSkills().contains(existingSkill)) {
                                existingUser.getSkills().add(existingSkill);
                            }
                            if (!existingSkill.getUsers().contains(existingUser)) {
                                existingSkill.getUsers().add(existingUser);
                            }
                        }
                    }

                    // Step 3: Save the user (cascades to skills due to PERSIST and MERGE)
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerExperiences(Long userId, List<Experience> updatedExperiences) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }
                    existingUser.getExperiences().clear();
                    if (updatedExperiences != null) {
                        updatedExperiences.forEach(experience -> {
                            if (experience.getProjects() != null) {
                                experience.getProjects().forEach(project -> {
                                    project.setExperience(experience);
                                });
                            }
                            experience.setUser(existingUser);
                            existingUser.getExperiences().add(experience);
                        });
                    }
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerEducations(Long userId, List<Education> updatedEducations) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }
                    existingUser.getEducations().clear();
                    if (updatedEducations != null) {
                        updatedEducations.forEach(education -> {
                            education.setUser(existingUser);
                            existingUser.getEducations().add(education);
                        });
                    }
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public User updateFreelancerCertificates(Long userId, List<Certificate> updatedCertificates) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }
                    existingUser.getCertificates().clear();
                    if (updatedCertificates != null) {
                        updatedCertificates.forEach(certificate -> {
                            certificate.setUser(existingUser);
                            existingUser.getCertificates().add(certificate);
                        });
                    }
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public void updateFreelancerLinks(User existingUser, List<LinkDTO> linksDTO) {
                existingUser.getLinks().clear();
                if (linksDTO != null) {
                    for (LinkDTO linkDTO : linksDTO) {
                        Link link = new Link();
                        link.setUrl(linkDTO.getUrl());
                        link.setUser(existingUser);
                        existingUser.getLinks().add(link);
                    }
                }
    }
}

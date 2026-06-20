package com.soham.aiinterviewcoach.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "session_directives")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionDirective {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "qna_id", nullable = false)
    private SessionQna qna;

    @Column(name = "directive_text", columnDefinition = "TEXT", nullable = false)
    private String directiveText;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;
}